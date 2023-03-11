const reviewModel = require("../models/reviewModel");
const plansModel = require("../models/plansModel");
module.exports.getAllReviews = async function getAllReviews(req, res) {
  try {
    const review = await reviewModel.find();
    if (review) {
      res.json({
        message: "review fund sucessfully",
        data: review,
      });
    } else {
      res.json({
        message: "oops review not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.top3Reviews = async function getRetop3Reviewsview(req, res) {
  try {
    const topReviews = await reviewModel.find().sort({ rating: -1 }).limit(3);
    if (topReviews) {
      return res.json({
        message: "review found sucessfully",
        data: topReviews,
      });
    } else {
      res.status(404).json({
        message: "review not found",
      });
    }
  } catch (error) {
    res,
      json({
        message: error.message,
      });
  }
};
module.exports.getPlanReview = async function getPlanReview(req, res) {
  try {
    let id = req.params.id;
    const review = await reviewModel.find({ plan: id });
    if (review) {
      res.json({
        message: "review retrived sucessfully",
        data: review,
      });
    } else {
      res.json({
        message: "review not found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
module.exports.createReview = async function createReview(req, res) {
  try {
    let id = req.params.planId;
    let reviewToBeCreated = req.body;
    const plan = await plansModel.findById(id);
    if (plan) {
      plan.ratingAverage = (plan.ratingAverage + reviewToBeCreated.rating) / 2;
      await plan.save();
      const review = await reviewModel.create(reviewToBeCreated);
      if (review) {
        res.status(200).json({
          message: "review created successfully",
          data: review,
        });
      } else {
        res.json({
          message: "something went wront pls try again",
        });
      }
    } else {
      res.json({
        message: "plan for another not found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
module.exports.updateReview = async function updateReview(req, res) {
  try {
    let id = req.body.id;
    let updatedReview = req.body;
    if (updatedReview) {
      let keys = [];
      for (let key in updatedReview) {
        keys.push(key);
      }
      let review = await reviewModel.findById(id);
      if (review) {
        for (let i = 0; i < keys.length; i++) {
          review[keys[i]] = updatedReview[keys[i]];
        }
        //saving the plan
        await review.save();
        res.json({
          message: "plan updated successfully",
          data: review,
        });
      } else {
        res.json({
          message: "review not fount",
        });
      }
    } else {
      res.json({
        message: "please add details first",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports.deleteReview = async function deleteReview(req, res) {
  try {
    try {
      let { plan } = req.params;
      let id = req.body.id;
      let reviewToBeDelete = await reviewModel.findByIdAndDelete(id);
      if (reviewToBeDelete) {
        res.json({
          message: "review deleted successfully",
          data: reviewToBeDelete,
        });
      } else {
        res.json({
          message: "review something went wrong",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
