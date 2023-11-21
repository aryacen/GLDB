import jwt from "jsonwebtoken";
import { create_error } from "../utils/error.js";

export const verify_token = (req, res, next) => {
  const token = req.body.data;

  if (!token) {
    return next(create_error(401, "User is not authenticated"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(token);
    if (err) {
      return next(create_error(403, "User is not authorized"));
    }
    req.user = user;
    next();
  });
};

export const verify_user = (req, res, next) => {
    verify_token_frontend(req, res, () => {
        if (req.user.id === req.params.id || req.user.is_admin) {
            next();
        } else {
            return next(create_error(403, "User is not authorized"));
        }
    });
};

export const verify_admin = (req, res, next) => {
  verify_token(req, res, () => {
    if (req.user.is_admin) {
      next();
    } else {
      return next(create_error(403, "User is not authorized"));
    }
  });
};

export const verify_token_frontend = async(req, res, next) => {
    const token = String(req.body.token);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(create_error(403, "User is not authorized"))
        }
        req.user = user;
        next();
    });   
};
