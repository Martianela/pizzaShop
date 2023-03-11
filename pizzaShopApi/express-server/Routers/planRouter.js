const express = require("express");
const planRouter = express.Router();
const { protectRoute, isAutharised } = require("../controler/authController");
const {
  getPlan,
  getAllPlans,
  createPlan,
  deletePlan,
  updatePlan,
  top3Plans,
} = require("../controler/plansController");
//top3 plans
planRouter.route("/top3").get(top3Plans);
//getting all plans of single plan
planRouter.use(protectRoute);
planRouter.route("/plan/:id").get(getPlan);
planRouter.route("/allPlans").get(getAllPlans);

//create plan  admin specific work or sellers
planRouter.use(isAutharised(["admin", "seller"]));
planRouter.route("/crudPlan").post(createPlan);

//update plan and delete plan
planRouter.route("/:id").patch(updatePlan).delete(deletePlan);

module.exports = planRouter;
