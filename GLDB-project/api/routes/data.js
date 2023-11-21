import express from "express";
const app = express();
var router = express.Router();

router.post("/", function (req, res, next) {
  const data = req.body; // assuming you have the 'body-parser' middleware installed
  console.log(data);
  // do something with the data, e.g. store it in a database or send a response back to the frontend
  res.send("Data sent!");
});

export default router;
