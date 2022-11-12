const router = require("express").Router();
const {
  models: { Order, LineItem },
} = require("../db/index");

// GET ROUTE: api/orders
// Getting all Orders (Admin feature)
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
    const item = await LineItem.destroy({
      where: { id: req.params.lineItemId },
    });
    res.status(204).send(item);
  } catch (error) {
    next(error);
  }
});

// ADD ROUTE:
// Adding items to cart.
// TODO: Maybe break this up into 2 diff post routes, 1 to create a new order, another to create a new LineItem w/o a new orderID.

// // CREATING AN ORDER ID
// router.post("/", async (req, res, next) => {
//   try {
//     console.log("-------->", req.body);
//     const potOrder = await Order.findByPk(req.body.orderId);

//     // console.log("HERE IS YOUR POT ORDER", potOrder);

//     if (potOrder === null) {
//       const order = await Order.create();
//       res.status(201).send(order);
//     } else {
//       console.error("no pot for you :( ");
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// // CREATING AN ORDER & LINE ITEM (original version)
// router.post("/", async (req, res, next) => {
//   try {
//     const order = await Order.create({ userId: 1 });
//     const product = req.body;
//     res.status(201).send(
//       await LineItem.create({
//         orderId: order.id,
//         productId: product.id,
//         price: product.price,
//         quantity: 1,
//       })
//     );
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/", async (req, res, next) => {
  try {
    const order = await Order.create();
    console.log("post route order", order);
    res.status(201).send(order);
  } catch (error) {
    next(error);
  }
});

router.post("/:orderId/lineItems", async (req, res, next) => {
  console.log("new line item post", req.body);
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

module.exports = router;
