let Sk =
  "sk_test_51MXTNISIcKPik3mXaoZyzgGh5mGFjO9xwJB7yziQtdoYnK1xcE3u027uh6GuYYCZFeniLkLxE5lbEmEUpnYr7UC8009hTuSR9F";
const stripe = require("stripe")(Sk);
const plansModel = require("../models/plansModel");
const userModel = require("../models/userModel");

module.exports.createSession = async function createSession(req, res) {
  try {
    let userId = req.id;
    let { plan: planId } = req.params;
    const user = await userModel.findById(userId);
    const plan = await plansModel.findById(planId);
    const session = await stripe.checkout.session.create({
      payment_method_types: ["card"],
      customer_email: user.email,
      client_reference_id: plan,
      line_items: [
        {
          name: plan.name,
          description: plan.ratingAverage,
          amount: plan.price,
          currency: "inr",
          quantity: 1,
        },
      ],
      success_url: `${req.protocol}://${rew.get("host")}/profile`,
      cancel_url: `${req.protocol}://${rew.get("host")}/profile`,
    });
    res.status(200).json({
      status: "success",
      session,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
