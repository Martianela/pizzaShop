const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const db_link =
  "mongodb+srv://admin:62YEndCf6mBg95M0@cluster0.mrgzeun.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then((db) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLenth: 8,
    validate: function () {
      return this.confirmPassword == this.password;
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "restaurantowner", "deleveryboy"],
    default: "user",
  },
  profileImage: {
    type: String,
    default: "img/user/default.png",
  },
  resetToken: String,
});

//remove confirm password before saving in db
userSchema.pre("save", function () {
  this.confirmPassword = undefined;
});

//

userSchema.methods.createResetToken = function createResetToken() {
  //creating unique token using npm crypyto
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = resetToken;
  return resetToken;
};

//
userSchema.methods.resetPasswordHandler = function resetPasswordHandler(
  password,
  confirmPassword
) {
  if (password === confirmPassword) this.password = password;
  this.resetToken = undefined;
};

//model
const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
//pre post hooks -: hooks is used for  getting functionality before or after saving data in databse
// userSchema.pre("save", function (doc) {
//   console.log("before saving in databse", doc);
// });

// userSchema.post("save", function (doc) {
//   console.log("after saving in databse", doc);
// });
//
// userSchema.pre("save", async function () {
//   let salt = await bcrypt.genSalt();
//   let hashString = await bcrypt.hash(this.password, salt);
//   this.password = hashString;
//   console.log(this.password);
// });
