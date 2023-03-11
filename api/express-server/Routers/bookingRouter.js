const express = require("express");
const { protectRoute } = require("../controler/authController");
const { createSession } = require("../controler/bookingController");
const bookingRouter = express.Router();

bookingRouter.post("/createSession", protectRoute, createSession);
bookingRouter.get("/createSession", (req, res) => {
  res.sendFile(
    "C:/Users/91975/Desktop/testing/express-server/views/booking.html"
  );
});
module.exports = bookingRouter;
