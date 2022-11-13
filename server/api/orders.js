const router = require("express").Router();
const {
  models: { Order, LineItem, Product },
} = require("../db/index");

// GET ROUTE: api/orders
// Get all Orders (Admin feature)
router.get("/", async (req, res, next) => {
  try {
    const order = await Order.findAll();
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// GET ROUTE:  api/orders/:orderId
// Get information for a specific order
router.get("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// GET ROUTE: api/orders/:orderId/lineItems
// Get all line items for a specific order
router.get("/:orderId/lineItems", async (req, res, next) => {
  try {
    const cartItems = await LineItem.findAll({
      where: { orderId: req.params.orderId },
      include: Product,
    });
    console.log(cartItems);
    res.send(cartItems);
  } catch (error) {
    next(error);
  }
});

// GET ROUTE: api/orders/:orderId/lineItems/:lineItemId
// Getting a specific item from that users cart OR a specific item from one of their orders
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
    const item = await LineItem.findByPk(req.params.lineItemId);
    item.destroy();
    console.log("router.delete item deleted", item);
    res.send(item);
  } catch (error) {
    next(error);
  }
});

// POST api/orders
// Create a new order:
router.post("/", async (req, res, next) => {
  try {
    const order = await Order.create();
    console.log("post route order", order);
    res.status(201).send(order);
  } catch (error) {
    next(error);
  }
});

// POST api/orders/:orderId/lineItems
// Create a new line item
router.post("/:orderId/lineItems", async (req, res, next) => {
  try {
    const lineItem = await LineItem.create({
      orderId: req.params.orderId,
      productId: req.body.id,
      price: req.body.price,
      qty: 1,
    });
    res.send(lineItem);
  } catch (error) {
    next(error);
  }
});

// PUT /api/orders/:orderId/lineItems/:lineItemId
// Update a line item (update quantity):
router.put("/:orderId/lineItems/:lineItemId", async (req, res, next) => {
  try {
    const item = await LineItem.findByPk(req.params.lineItemId);
    const updatedItem = await item.update(req.body);
    res.send(updatedItem);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
