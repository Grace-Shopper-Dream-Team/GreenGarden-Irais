const router = require("express").Router();
const {
  models: { Order, LineItem },
} = require("../db/index");

//GET ROUTE: api/orders
router.get("/", async (req, res, next) => {
  try {
    const order = await Order.findAll(req.params.orderId);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

//GET ROUTE: api/orders/:orderId/lineItems
//TODO: fix this route
router.get("/:orderId/lineItems", async (req, res, next) => {
  try {
    const cartItems = await LineItem.findAll({
      where: { orderId: req.params.orderId },
    });
    console.log(cartItems);
    res.send(cartItems);
  } catch (error) {
    next(error);
  }
});

//GET ROUTE: api/orders/:orderId/lineItems/:lineItemId
router.get("/:orderId/lineItems/:lineItemId", async (req, res, next) => {
  try {
    const item = await LineItem.findAll({
      where: { id: req.params.lineItemId },
    });
    res.send(item);
  } catch (error) {
    next(error);
  }
});

//DELETE ROUTE: api/orders/:orderId/lineItems/:lineItemId
//This route deletes 1 item from a cart
router.delete("/:orderId/lineItems/:lineItemId", async (req, res, next) => {
  try {
    const item = await LineItem.destroy({
      where: { id: req.params.lineItemId },
    });
    res.status(204).send(item);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const order = await Order.create({ userId: 1 });
    const product = req.body;
    res
      .status(201)
      .send(
        await LineItem.create({
          orderId: order.id,
          productId: product.id,
          price: product.price,
          quantity: 1,
        })
      );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
