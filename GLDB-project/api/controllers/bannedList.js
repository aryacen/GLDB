import User from "../models/User.js";

export const ban_user = async (req, res, next) => {
  try {
    const users = await User.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { banned_list: req.body.bannedId },
      },
      {
        new: true,
        projection: { banned_list: 1},
      }
    );
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const unban_user = async (req, res, next) => {
  try {
    const users = await User.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { banned_list: req.body.unbanId },
      },
      {
        new: true,
        projection: { banned_list: 1},
      }
    );
    await users.save();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export async function isBanned(userId, bannedId) {
  let banned = false;
  const users = await User.findById(userId);
  if (users.banned_list.includes(bannedId)) {
    banned = true;
  }
  return banned;
}
