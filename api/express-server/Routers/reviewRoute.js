const express = require("express");
const reviewRouter = express.Router();
const { protectRoute, isAutharised } = require("../controler/authController");
const {
  getAllReviews,
  top3Reviews,
  getPlanReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controler/reviewController");
//get
reviewRouter.route("").get(getAllReviews);
//top3 reviews
reviewRouter.route("/top3").get(top3Reviews);

//get plan review
reviewRouter.route("/:id").get(getPlanReview);

//
reviewRouter
  .route("/crud/:planId")
  .post(createReview)
  .patch(updateReview)
  .delete(deleteReview);

module.exports = reviewRouter;
