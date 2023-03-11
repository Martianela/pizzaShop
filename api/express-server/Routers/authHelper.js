const jwt = require("jsonwebtoken");
const JWT_KEY = require("../secrets.js");

function protectRoute(req, res, next) {
  if (req.cookies.login) {
    let isVerified = jwt.verify(req.cookies.login, JWT_KEY);
    if (isVerified) next();
  } else {
    res.json({
      message: "opretion not allowed",
    });
  }
}
module.exports = protectRoute;
