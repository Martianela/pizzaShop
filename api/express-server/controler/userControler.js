const userModel = require("../models/userModel");

module.exports.postUser = function postUser(req, res) {
  console.log(req.body);
  res.json({
    message: "data send sucessfully",
    user: req.body.Name,
  });
};

module.exports.getUser = async function getUser(req, res) {
  let id = req.id;
  console.log(req.id);
  let allUsers = await userModel.findById(id);
  res.json({
    message: "list of all users",
    data: allUsers,
  });
};

module.exports.updateUser = async function updateUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;
    if (user) {
      const keys = [];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }
      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }
      const updatedData = await user.save();
      res.json({
        message: "user updated sucessfully",
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    let id = req.params.id;
    const user = await userModel.findByIdAndDelete(id);
    if (user) {
      res.json({
        message: "user deleted successfully",
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports.getAllUser = async function getUserById(req, res) {
  try {
    let user = await userModel.find();
    if (user) {
      res.json({
        message: "users retrived",
        data: user,
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports.updateProfileImage = function updateProfileImage(req, res) {
  res.send("image uploaded successfully");
};
// function setCookies(req, res) {
//   // res.setHeader("set-cookie", "isLoggerIn=true");
//   res.cookie("isLoggedIn", true, {
//     maxAge: 1000 * 360 * 24,
//     secure: true,
//     httpOnly: true,
//   });
//   res.json({
//     message: "cookies send sucessfully",
//   });
// }
// function getCookies(req, res) {
//   let cookies = req.cookies;
//   console.log(cookies);
//   res.json({
//     message: "cookies get sucessfully",
//     data: cookies,
//   });
// }
