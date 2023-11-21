import Post from "../models/Post.js";

export const create_post = async (req, res, next) => {
  try {
    const { title, content, author ,username} = req.body;
    const new_post = new Post({ title, content, author ,username});
    await new_post.save();
    res.status(201).json(new_post);
  } catch (err) {
    next(err);
  }
};

export const update_post = async (req, res, next) => {
  try {
    const updated_post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updated_post);
  } catch (err) {
    next(err);
  }
};

export const delete_post = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted");
  } catch (err) {
    next(err);
  }
};

export const get_post_by_id = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

export const get_all_posts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {         
    next(err);
  }
};
