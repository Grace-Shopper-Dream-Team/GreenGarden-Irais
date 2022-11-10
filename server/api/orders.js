const router = require("express").Router();
const {
  models: { Order, LineItem },
} = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const order = await Order.findAll(req.params.orderId);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create({ userId: 1 })
    const product = req.body;
    res.status(201).send( await LineItem.create({ orderId: order.id, productId: product.id, price: product.price, quantity:1  }));
  } catch (error) {
    next(error);
  }
})



module.exports = router;
