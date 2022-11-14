const router = require("express").Router();
const {
  models: { Order, LineItem, User, Product },
} = require("../db/index");

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
    res.status(201).send(order);
  } catch (error) {
    next(error);
  }
});

// POST api/orders/:orderId/lineItems
// Create a new line item
router.post("/:orderId/lineItems", async (req, res, next) => {
  try {
    let lineItem = await LineItem.create({
      orderId: req.params.orderId,
      productId: req.body.id,
      price: req.body.price,
      qty: 1,
    });
    lineItem = await LineItem.findByPk(lineItem.id, { include: Product });
    res.send(lineItem);
  } catch (error) {
    next(error);
  }
});

router.post("/loggedIn", async (req, res, next) => {
  try {
    const loggedInUser = await User.findByToken(req.body.token);
    const getUserExistingOrderId = await Order.findOne({
      where: { userId: loggedInUser.id, status: "In Cart" },
    });
    let newItemSameOrder;
    if (getUserExistingOrderId.id) {
      newItemSameOrder = await LineItem.create({
        orderId: getUserExistingOrderId.id,
        productId: req.body.id,
        price: req.body.price,
      });
    }
    const newLineItemWithProductInfo = await LineItem.findOne({
      where: { orderId: getUserExistingOrderId.id },
      include: Product,
    });
    res.status(201).send(newLineItemWithProductInfo);
  } catch (error) {
    next(error);
  }
});

// get route for logged in user cart
router.get("/loggedIn/:token", async (req, res, next) => {
  try {
    const loggedInUser = await User.findByToken(req.params.token);
    const userId = loggedInUser.id;
    const orderIdOfUser = await Order.findOne({
      where: { userId: userId, status: "In Cart" },
    });
    const usersLineItems = await LineItem.findAll({
      where: { orderId: orderIdOfUser.id },
      include: Product,
    });
    res.status(200).send(usersLineItems);
  } catch (error) {
    next(error);
  }
});

router.delete("/loggedIn/:lineItemId", async (req, res, next) => {
  try {
    const lineItemIdToDelete = req.params.lineItemId;
    const deletedItem = await LineItem.findByPk(lineItemIdToDelete);
    await LineItem.destroy({
      where: { id: lineItemIdToDelete },
    });
    res.send(deletedItem);
  } catch (error) {
    next(error);
  }
});

// PUT /api/orders/:orderId/lineItems/:lineItemId
// Update a line item (update quantity):
router.put("/:orderId/lineItems/:lineItemId", async (req, res, next) => {
  try {
    const item = await LineItem.findByPk(req.params.lineItemId);
    let updatedItem = await item.update(req.body);
    updatedItem = await LineItem.findByPk(updatedItem.id, { include: Product });
    res.send(updatedItem);
  } catch (error) {
    next(error);
  }
});

router.put("/loggedIn/addTo/:lineItemId", async (req, res, next) => {
  try {
    const { lineItemId } = req.params;
    const itemToAddTo = await LineItem.findByPk(lineItemId);
    const updatedItem = await itemToAddTo.update({
      qty: (itemToAddTo.qty += 1),
    });
    await itemToAddTo.save();
    const updateItemWithProductInfo = await LineItem.findByPk(updatedItem.id, {
      include: Product,
    });
    res.status(200).send(updateItemWithProductInfo);
  } catch (error) {
    next(error);
  }
});

router.put("/loggedIn/subtract/:lineItemId", async (req, res, next) => {
  try {
    const { lineItemId } = req.params;
    const itemToSubtractFrom = await LineItem.findByPk(lineItemId);
    const updatedItem = await itemToSubtractFrom.update({
      qty: (itemToSubtractFrom.qty -= 1),
    });
    await itemToSubtractFrom.save();
    const updateItemWithProductInfo = await LineItem.findByPk(updatedItem.id, {
      include: Product,
    });
    res.status(200).send(updateItemWithProductInfo);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
