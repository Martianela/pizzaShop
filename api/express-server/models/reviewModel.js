const mongoose = require("mongoose");
const db_link =
  "mongodb+srv://admin:62YEndCf6mBg95M0@cluster0.mrgzeun.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then((db) => {
    console.log("review db is database connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "please write review first "],
  },
  rating: {
    type: Number,
    required: [true, "please write rating first "],
    min: 1,
    max: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "userModel",
    required: [true, "review must belons to the user"],
  },
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: "plansModel",
    required: [true, "review must belons to the plan"],
  },
});
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name profileImage",
  }).populate("plan");
  next();
});
const reviewModel = new mongoose.model("reviewModel", reviewSchema);
module.exports = reviewModel;
