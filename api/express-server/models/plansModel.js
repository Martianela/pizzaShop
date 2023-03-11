//connecting to dbms
const mongoose = require("mongoose");
const db_link =
  "mongodb+srv://admin:62YEndCf6mBg95M0@cluster0.mrgzeun.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then((db) => {
    console.log("plan db is database connected");
  })
  .catch(function (err) {
    console.log(err);
  });

//making plans schema

const plansSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, "plan name should not exceed than 20 characters"],
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "price not entered"],
  },
  ratingAverage: {
    type: Number,
    required: [true, "rating average not entered"],
  },
  discount: {
    type: Number,
    validate: [
      function () {
        return this.discount < 100;
      },
      "discount should not exceed the price",
    ],
  },
});

const plansModel = new mongoose.model("plansModel", plansSchema);
module.exports = plansModel;
