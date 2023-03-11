const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = require("../secrets.js");
const { sendEmail } = require("../utility/nodeMailer");
module.exports.login = async function login(req, res) {
  try {
    let { email, password } = req.body;
    if (email) {
      let user = await userModel.findOne({ email: email });
      if (user) {
        if (user.password === password) {
          let udi = user["_id"];
          let token = jwt.sign({ payload: udi }, JWT_KEY);
          // res.cookie("isLoggedIn", true, { httpOnly: true });
          res.cookie("login", token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 360 * 24 * 365 * 7,
          });
          res.json({
            message: "user sucessfully logged in",
            userData: {
              email: email,
            },
          });
        } else {
          res.json({
            message: "wrong cridentials",
          });
        }
      } else {
        res.json({
          message: "User not found",
        });
      }
    } else {
      res.json({
        message: "please enter email address",
      });
    }
  } catch (err) {
    res.status(500);
    res.json({
      message: err.message,
    });
  }
};

module.exports.signup = async function signup(req, res) {
  try {
    let data = req.body;
    let user = await userModel.create(data);
    await sendEmail("signup", user);
    if (!user) {
      res.json({
        message: "something went wrong",
      });
    }
    res.json({
      message: "signup successfully",
    });
  } catch (error) {
    res.status(500);
    res.json({
      message: "error creating user",
      data: error.message,
    });
  }
};

//autharised function to check user role
module.exports.isAutharised = function (roles) {
  return function (req, res, next) {
    let userRole = req.role;
    if (roles.includes(userRole)) {
      next();
    } else {
      res.status(401);
      res.json({
        message: "opration not allowed",
      });
    }
  };
};

//protect Routes
module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {
      token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY);
      //console.log(payload);
      if (payload) {
        let user = await userModel.findById(payload.payload);
        //console.log(user);
        req.role = user.role;
        req.id = user.id;
        // console.log(req.id);
        next();
      } else {
        const client = req.get("User-Agent");
        if (client.includes("Mozila")) {
          return res.redirect("/login");
        }
        res.json({
          message: "user not verified",
        });
      }
    } else {
      res.json({
        message: "something went wrong please login again",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

//forgetPassword

module.exports.forgetPassword = async function forgetPassword(req, res, next) {
  try {
    let { email } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
      // create reset token used to create new reset token
      const resetToken = user.createResetToken();
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetpassword/${resetToken}`;
      //send email trough user
      //nodemailer
      await sendEmail({
        resetPasswordLink: resetPasswordLink,
        email: user.email,
      });
      res.json({
        message: "reset link has been sent to your email address",
      });
    } else {
      res.json({
        message: "Please check your email address",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//resetPassword

module.exports.resetPassword = async function resetPassword(req, res) {
  try {
    let { password, confirmPassword } = req.body;
    let token = req.prams.token;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      // will update user password in db
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        message: "User saved successfully please log in again",
      });
    } else {
      res.json({
        message: "something went wrong please try again",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//logout
module.exports.logout = function logout(req, res) {
  res.cookie("login", " ", { maxAge: 1 });
  res.redirect("/login");
};
