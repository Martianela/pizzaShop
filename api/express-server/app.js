const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.listen(process.env.PORT || 3001, (req, res) => {
  console.log("listining on port 3000");
});
const userRouter = require("./Routers/userRouter");
const planRouter = require("./Routers/planRouter");
const reviewRouter = require("./Routers/reviewRoute");
const bookingRouter = require("./Routers/bookingRouter");
//global middleware
app.use("/plans", planRouter);
app.use("/user", userRouter);
app.use("/reviews", reviewRouter);
app.use("/booking", bookingRouter);
//404 page
app.use((req, res) => {
  res.status(404);
  res.sendFile(__dirname + "/views/404.html");
});
