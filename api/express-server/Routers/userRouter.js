const express = require("express");
const userRouter = express.Router();
const multer = require("multer");
const cookieParser = require("cookie-parser");
// const protectRoute = require("./authHelper");
const {
  getUser,
  postUser,
  deleteUser,
  updateUser,
  getAllUser,
  updateProfileImage,
} = require("../controler/userControler");
const {
  login,
  signup,
  isAutharised,
  protectRoute,
  forgetPassword,
  resetPassword,
  logout,
} = require("../controler/authController");

//user options crud
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

userRouter.route("/login").post(login);
userRouter.route("/signup").post(signup);

//forget password
userRouter.route("/forgetpassword").post(forgetPassword);
userRouter.route("/resetpassword/:token").post(resetPassword);
//multer file upload
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../image");
  },
  filename: function (req, file, cb) {
    cb(null, `user-${Date.now()}.jpeg`);
  },
});
const filter = function (req, file, cb) {
  login(file.mimetype);
  if (file.mimetype.startsWith("image/jpg")) {
    cb(null, true);
  } else {
    cb(new Error("not a image please upload valid type"));
  }
};

const upload = multer({
  Storage: multerStorage,
  fileFilter: filter,
});
//logout
userRouter.route("/logout").get(logout);
//profile page
userRouter.use(protectRoute);
userRouter.route("/userProfile").get(getUser);
userRouter.post("/profileImage", upload.single("photo"), updateProfileImage);
userRouter.get("/profileImage", (req, res) => {
  res.sendFile(
    "C:/Users/91975/Desktop/testing/express-server/views/multer.html"
  );
});
//admin specific work
userRouter.use(isAutharised(["admiin"]));
userRouter.route("/").get(getAllUser);

module.exports = userRouter;
