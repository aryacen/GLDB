import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { create_error } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config()

const contains_upper = (str) => {
    return /[A-Z]/.test(str);
}

const contains_lower = (str) => {
    return /[a-z]/.test(str);
}

const contains_num = (str) => {
    return /\d/.test(str);
}

const contains_sym = (str) => {
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return (format.test(str));
}

const gen_random_str = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const c_length = characters.length

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * c_length));
    }
    return result;
};

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})

const valid_username = (username) => {
    if (username.length < 4 || username.length > 50) {
        return false;
    }
    return true;
}

const valid_password = (password) => {
    if (!contains_upper(password) || !contains_lower(password) || password.length < 4 || !contains_num(password) || !contains_sym(password)) {
        return false;
    }
    return true;
}

export const register = async(req, res, next) => {
    try {
        const exist = await User.findOne({email: req.body.email});
        if (exist) {
            return next(create_error(400, "Email already exists"));
        }
        const username_exist = await User.findOne({
            username: req.body.username
        });
        if (username_exist) {
            return next(create_error(408, "Username already taken"));
        }

        if (req.body.password != req.body.confirm_password) {
            return next(create_error(401, "Passwords do not match!"))
        }

        if (!valid_password(String(req.body.password))) {
            return next(create_error(404, "Passwords must be at least 4 characters long, contains at least one uppercase and lowercase character, a symbol and a number"));
        }

        if (!valid_username(String(req.body.username))) {
            return next(create_error(406, "Username must be between 4 and 50 characters"));
        }

        // encrypt user's password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const new_user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hash,
            confirm_password: hash
        })

        await new_user.save()

        const token = jwt.sign({ id: new_user._id, is_admin: new_user.is_admin}, process.env.JWT_SECRET);
        const { password, confirm_password, is_admin, ...others } = new_user._doc;

        res.cookie("access_token", token, { httpOnly: true,}).status(200).json({details: {...others}, is_admin, token});

    } catch(err) {
        next(err);
    }
}

export const login = async(req, res, next) => {
    try {
        // find email in the database
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return next(create_error(404, "Email not found!"))
        };

        const correct_password = await bcrypt.compare(req.body.password, user.password);
        if (!correct_password) {
            return next(create_error(400, "Incorrect password or email!"));
        };
        
        const token = jwt.sign({ id: user._id, is_admin: user.is_admin}, process.env.JWT_SECRET);
        const { password, confirm_password, is_admin, ...others } = user._doc;

        res.cookie("access_token", token, { httpOnly: true,}).status(200).json({details: {...others}, is_admin, token});
    } catch(err) {
        next(err);
    }
}

export const logout = async(req, res, next) => {
    res.cookie("access_token", "1", {expires: new Date("Jan 1, 1970 00:00:00")}).status(200).json("User has been logged out!");
}

export const forgot_password = async(req, res, next) => {
    try {
        // find email in the database
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).json("We will send out the code if the email exists!");
        };

        const reset_code = gen_random_str(5);

        const options = {
            from: process.env.EMAIL_USER,
            to: String(req.body.email),
            subject: "Your one-time code to reset your GLDB password",
            text: "Hi,\nHere is the code you have requested to reset your GLDB account password. Do NOT share this code with anyone: " + String(reset_code)
        }
        transport.sendMail(options, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                //console.log(info);
            }
        });

        user.reset_code = reset_code;
        await user.save();

        const email = req.body.email
        res.status(200).json(email);

    } catch(err) {
        next(err);
    }
}

export const confirm_resetcode = async(req, res, next) => {
    try {
        // find email in the database
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return next(create_error(404, "Email not found!"))
        };
        if (String(req.body.reset_code) != String(user.reset_code)) {
            return next(create_error(400, "Reset code is incorrect!"))
        }
        res.status(200).json();
    } catch(err) {
        next(err);
    }
}

export const reset_password = async(req, res, next) => {
    try {
        // find email in the database
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return next(create_error(404, "Email not found!"));
        };

        if (!valid_password(String(req.body.new_password))) {
            return next(create_error(400, "Passwords must be at least 4 characters long, contains at least one uppercase and lowercase character, a symbol and a number"));
        }

        if (req.body.new_password != req.body.new_confirm_password) {
            return next(create_error(401, "Passwords do not match!"));
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(String(req.body.new_password), salt)

        const new_user = await User.findByIdAndUpdate(
            String(user.id),
            {$set: {"password": hash}},
            {new: true}
        );
        
        new_user.reset_code = null;
        await new_user.save();

        res.status(200).json(new_user);
    } catch(err) {
        next(err);
    }
};

export const update_password = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const current_password = req.body.current_password;
        let match = false;
        bcrypt.compare(current_password, String(user.password), async (err, result) => {
            if (err) {
                return next(err);
            } else {
                if (result) {
                    if (req.body.new_password != req.body.new_password_confirm) {
                        return next(create_error(401, "Passwords do not match"));
                    }
                    if (!valid_password(String(req.body.new_password))) {
                        return next(create_error(400, "Passwords must be at least 4 characters long, contains at least one uppercase and lowercase character, a symbol and a number"));
                    }
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(String(req.body.new_password), salt);
                    const new_user = await User.findByIdAndUpdate(
                        req.params.id,
                        {$set: {"password": hash}},
                        {new: true}
                    );
                    res.status(200).json(new_user);
                } else {
                    return next(create_error(405, "Incorrect password"));
                }
            }
        });
    } catch(err) {
        next(err);
    }
};

export const token_to_id = async(req, res, next) => {
    try {
        const token = String(req.body.token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;

        res.status(200).json(id)
        
    } catch (err) {
        next(err);
    }
};
