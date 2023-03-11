const express = require("express");
const app = express();
const authRouter = express.Router();
//authRouter.route("/signup").get(midleware, getSignUp);
//authRouter.route("/login").post(loginUser);

function getSignUp(req, res) {
  res.sendFile(__dirname + "/views/signup.html");
}

function midleware(req, res, next) {
  console.log("middlewear called sucessfully");
  next();
}

module.exports = authRouter;
