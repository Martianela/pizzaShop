const plansModel = require("../models/plansModel");
module.exports.getAllPlans = async function getAllPlans(req, res) {
  try {
    let plans = await plansModel.find();
    console.log(plans);
    if (plans) {
      res.json({
        message: "plans found sucessfully ",
        plans: plans,
      });
    } else {
      res.json({
        message: "plaese add plans first",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports.getPlan = async function getAllPlans(req, res) {
  try {
    let id = req.params.id;
    console.log(id);
    let plan = await plansModel.findById(id);
    if (plan) {
      res.json({
        message: "plan found sucessfully ",
        plans: plan,
      });
    } else {
      res.json({
        message: "plaese add plans first",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports.createPlan = async function createPlan(req, res) {
  try {
    let plan = req.body;
    if (plan) {
      let cretedPlan = await plansModel.create(plan);
      if (cretedPlan) {
        res.json({
          message: "plan created sucessfully",
          plan: cretedPlan,
        });
      }
    } else {
      res.json({
        message: "someting went wrong pleae enter again",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports.deletePlan = async function deletePlan(req, res) {
  try {
    let id = req.params.id;
    let planToBeDelete = await plansModel.findByIdAndDelete(id);
    res.json({
      message: "plan deleted successfully",
      data: planToBeDelete,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports.updatePlan = async function updatePlan(req, res) {
  try {
    let id = req.params.id;
    let updatedPlan = req.body;
    if (updatedPlan) {
      let keys = [];
      for (let key in updatedPlan) {
        keys.push(key);
      }
      let plan = await plansModel.findById(id);
      if (plan) {
        for (let i = 0; i < keys.length; i++) {
          plan[keys[i]] = updatedPlan[keys[i]];
        }
        //saving the plan
        await plan.save();
        res.json({
          message: "plan updated successfully",
          data: plan,
        });
      } else {
        res.json({
          message: "plan not fount",
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

//get top 3 plans
module.exports.top3Plans = async function top3Plans(req, res) {
  try {
    const plans = await plansModel
      .find()
      .sort({
        ratingAverage: -1,
      })
      .limit(3);
    if (plans) {
      return res.json({
        message: "plans found sucessfully",
        data: plans,
      });
    } else {
      res.status(404).json({
        message: "Plans not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
