const router = require("express").Router();
const {
  // I Also added User here!
  models: { Order, LineItem, User },
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
      where: { id: req.params.orderId },
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

/// Irais
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
    res.status(201).send(newItemSameOrder);
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

router.put("/loggedIn/addTo/:lineItemId", async (req, res, next) => {
  try {
    const { lineItemId } = req.params;
    const itemToAddTo = await LineItem.findByPk(lineItemId);
    const updatedItem = await itemToAddTo.update({
      qty: (itemToAddTo.qty += 1),
    });
    await itemToAddTo.save();
    res.status(200).send(updatedItem);
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
    res.status(200).send(updatedItem);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
