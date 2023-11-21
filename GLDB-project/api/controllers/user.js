import User from "../models/User.js";
import FriendRequests from "../models/FriendRequests.js";
import bcrypt from "bcryptjs";
import { create_error } from "../utils/error.js";

const valid_username = (username) => {
    if (username.length < 4 || username.length > 50) {
        return false;
    }
    return true;
}

export const update_user = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        let username = user.username;
        let email = user.email;

        if (req.body.new_username) {
            username = String(req.body.new_username);
        }
        if (req.body.new_email) {
            email = String(req.body.new_email)
        }

        const exist = await User.findOne({
            email: req.body.new_email
        });
        if (exist) {
            return next(create_error(400, "Email already exists"));
        }
        const username_exist = await User.findOne({
            username: req.body.new_username
        });
        if (username_exist) {
            return next(create_error(402, "Username already taken"));
        }

        if (!valid_username(String(req.body.new_username))) {
            return next(create_error(401, "Username must be between 4 and 50 characters"));
        }

        const new_user = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    "username": username,
                    "email": email,
                }
            },
            { new: true }
        );
        res.status(200).json(new_user)
    } catch (err) {
        next(err);
    }
};

export const update_profile_picture = async (req, res, next) => {
    try {
        const new_user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { "profile_picture": String(req.body.profile_picture) } },
            { new: true }
        );
        res.status(200).json(new_user);
    } catch (err) {
        next(err);
    }
};

export const delete_user = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(
            req.params.id,
        );
        res.status(200).json("User has been deleted");
    } catch (err) {
        next(err);
    }
};

export const get_user = async (req, res, next) => {
    try {
        const user = await User.findById(
            req.params.id,
        );
        res.status(200).json(user)
    } catch (err) {
        next(err);
    }
};

export const get_all_user = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        next(err);
    }
};

export const subscribe = async (req, res, next) => {
    try {
        const new_user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { "pro_user": true } },
            { new: true });
        res.status(200).json(new_user);
    } catch (err) {
        next(err);
    }
};

export const send_friend_request = async (req, res, next) => {
    try {
        const sender = await User.findById(req.body.senderId);
        const receiver = await User.findById(req.body.receiverId);

        if (sender.friends_list.includes(receiver._id) || receiver.friends_list.includes(sender._id)) {
            return (next(create_error(400, "Already friends")));
        }

        const existing_request = await FriendRequests.findOne({ sender: String(sender._id), receiver: String(receiver._id) });
        if (existing_request) {
            return (next(create_error(400, "Friend request already sent")));
        };

        const friend_request = new FriendRequests({
            sender: String(sender._id),
            receiver: String(receiver._id),
        });
        await friend_request.save();

        const output = {
            "requestId": friend_request._id,
            "border_color": sender.border_color,
            "userId": sender._id,
            "username": sender.username,
            "profile_picture": sender.profile_picture,
            
        };

        receiver.friend_requests_received.push(output);
        await receiver.save();

        sender.friend_requests_sent.push(friend_request._id);
        await sender.save();

        res.status(200).json(friend_request);
    } catch (err) {
        next(err);
    }
};

export const accept_friend_request = async (req, res, next) => {
    try {
        const friend_request = await FriendRequests.findById(req.body.fr_id);

        if (friend_request.receiver !== String(req.body.id)) {
            return (next(create_error(400, "Friend request is not for this user")));
        }

        const sender = friend_request.sender;
        const receiver = friend_request.receiver;
        const sender_user = await User.findById(sender);
        const receiver_user = await User.findById(receiver);

        if (sender_user.friends_list.includes(receiver) || receiver_user.friends_list.includes(sender)) {
            return (next(create_error(400, "Already friends")));
        }

        friend_request.status = "accepted";
        await FriendRequests.findByIdAndDelete(friend_request._id);

        sender_user.friends_list.push({
            "userId": receiver_user._id,
            "username": receiver_user.username,
            "profile_picture": receiver_user.profile_picture,
            "border_color": receiver_user.border_color,
        });

        let idx_receiver = receiver_user.friend_requests_received.findIndex(item => String(item.requestId) === String(friend_request._id));
        receiver_user.friend_requests_received.splice(idx_receiver, 1);

        let idx_sender = sender_user.friend_requests_sent.findIndex(item => String(item) === String(friend_request._id));
        sender_user.friend_requests_sent.splice(idx_sender, 1);

        await sender_user.save();

        receiver_user.friends_list.push({
            "userId": sender_user._id,
            "username": sender_user.username,
            "profile_picture": sender_user.profile_picture,
            "border_color": sender_user.border_color,
        });
        await receiver_user.save();

        res.status(200).json(receiver_user);
    } catch (err) {
        next(err);
    }
};

export const decline_friend_request = async (req, res, next) => {
    try {
        const friend_request = await FriendRequests.findById(req.body.fr_id);

        if (friend_request.receiver.toString() !== String(req.body.id)) {
            return next(create_error(400, "Friend request is not for this user"));
        }
        friend_request.status = "declined";
        await FriendRequests.findByIdAndDelete(friend_request._id);

        const receiver = friend_request.receiver;
        const sender = friend_request.sender;
        const receiver_user = await User.findById(receiver);
        const sender_user = await User.findById(sender);

        let idx = receiver_user.friend_requests_received.findIndex(item => String(item.requestId) == String(friend_request._id));
        receiver_user.friend_requests_received.splice(idx, 1);
        await receiver_user.save();

        let idx_sender = sender_user.friend_requests_sent.findIndex(item => String(item) === String(friend_request._id));
        sender_user.friend_requests_sent.splice(idx_sender, 1);
        await sender_user.save();

        res.status(200).json(receiver_user);
    } catch (err) {
        next(err);
    }
};

export const remove_friend = async (req, res, next) => {
    try {
        const sender = await User.findById(req.body.senderId);
        const receiver = await User.findById(req.body.receiverId);
        console.log('Friend list of sender (before): ' )
        sender.friends_list.map((item, index) => {
            console.log(index, item.username);
        });

        let idx_sender = sender.friends_list.findIndex(item => String(item.userId) === String(receiver._id));
        sender.friends_list.splice(idx_sender, 1);
        await sender.save();
        sender.friends_list.map((item, index) => {
            console.log(index, item.username);
        });

        let idx_receiver = receiver.friends_list.findIndex(item => String(item.userId) === String(sender._id));
        receiver.friends_list.splice(idx_receiver, 1);
        await receiver.save();

        res.status(200).json(sender);
    } catch (err) {
        next(err);
    }
};

export const friend_request_status = async (req, res, next) => {
    try {
        const sender = await User.findById(req.body.senderId);
        const receiver = await User.findById(req.body.receiverId);

        const existing_request_sender = await FriendRequests.findOne({ sender: String(sender._id), receiver: String(receiver._id), status: 'pending' });
        const existing_request_receiver = await FriendRequests.findOne({ sender: String(receiver._id), receiver: String(sender._id), status: 'pending' });
        if (existing_request_sender || existing_request_receiver) {
            res.status(200).send(true);
        }
        res.status(200).send(false);

    } catch (err) {
        next(err);
    }
};

export const friend_status = async (req, res, next) => {
    try {
        const profile = await User.findById(req.body.profileId);
        const user = await User.findById(req.body.userId);
        let exist = false;

        user.friends_list.map((item) => {
            if (item.userId == String(profile._id)) {
                exist = true;
            }
        });

        if (exist) {
            res.status(200).send(true);
        }
        res.status(200).send(false);
    } catch (err) {
        next(err);
    }
};

export const ban_status = async (req, res, next) => {
    try {
        const profile = await User.findById(req.body.profileId);
        const user = await User.findById(req.body.userId);
        let exist = false;

        user.banned_list.map((item) => {
            if (item == profile._id) {
                exist = true;
            }
        });

        if (exist) {
            res.status(200).send(true);
        }
        res.status(200).send(false);
    } catch (err) {
        next(err);
    }
};

export const set_border_colour = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,
            { $set: { "border_color": req.body.color } },
            { new: true });
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const update_genres = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        let found = false;
        user.preferred_genres.map((genre) => {
            if (req.body.genreName == genre) {
                found = true;
            }
        });
        if (found) {
            const index = user.preferred_genres.findIndex(item => item == req.body.genreName);
            user.preferred_genres.splice(index, 1);
            await user.save();
        } else {
            user.preferred_genres.push(String(req.body.genreName));
            await user.save();
        };
        res.status(200).json(user.preferred_genres);
    } catch (err) {
        next(err);
    }
};

export const add_to_watched = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const watchedDate = new Date();
        const movie = {
            movieId: req.body.movieId,
            movieTitle: req.body.movieTitle,
            moviePoster: req.body.moviePoster,
            dateWatched: watchedDate,
        };
        user.watched_movies.push(movie);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const remove_from_watched = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const movieId = req.body.movieId;

        const movieIndex = user.watched_movies.findIndex(movie => movie.movieId === movieId);
        user.watched_movies.pull(user.watched_movies[movieIndex]);

        await user.save();
        res.status(200).json(user);

    } catch (err) {
        next(err);
    }
};

export const inWatchedlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        let exist = false;
        user.watched_movies.map((item) => {
            if (item.movieId == req.body.movieId) {
                exist = true;
            }
        });

        if (exist) {
            res.status(200).json(true);
        }
        res.status(200).json(false);
    } catch(err) {
        next(err);
    }
};