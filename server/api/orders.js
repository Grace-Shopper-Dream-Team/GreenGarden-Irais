const router = require("express").Router();
const {
  models: { Order },
} = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const order = await Order.findAll(req.params.orderId);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
