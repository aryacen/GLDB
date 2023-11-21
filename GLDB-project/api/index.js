import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import auth_route from "./routes/auth.js";
import users_route from "./routes/users.js";
import wishls_route from "./routes/wishlist.js";
import review_route from "./routes/review.js"
import search_route from "./routes/search.js";
import cookieParser from "cookie-parser";
import movie_route from "./routes/movie.js";
import ban_route from "./routes/banedList.js";
import calendar_route from "./routes/watchTogether.js"

// const indexRouter = require('./routes/index')
import indexRouter from "./routes/hello.js";

import dataRouter from "./routes/data.js";

import submitFormRouter from "./routes/submitForm.js";

import cors from "cors";

//form
import postRouter from "./routes/posts.js";

import commentRouter from "./routes/comment.js"

const app = express();
dotenv.config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

app.use(cors());
// middlewares

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", auth_route);
app.use("/api/users", users_route);
app.use("/api/wishlist", wishls_route);
app.use("/api/review", review_route);
app.use("/api/movie", movie_route);
app.use("/api/banlist", ban_route);
app.use("/api/search", search_route);
app.use("/api/calendar", calendar_route);

app.use("/", indexRouter); //
app.use("/api/data", dataRouter); //
app.use("/api/submit-form", submitFormRouter); //

app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.listen(9000, () => {
  connect();
  console.log("Connected to backend");
});
