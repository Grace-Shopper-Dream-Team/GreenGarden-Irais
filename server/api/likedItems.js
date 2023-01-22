const likedItemsRouter = require("express").Router();
const {
  models: { LikedItem, User },
} = require("../db/");
const Product = require("../db/models/Product");
const { requireToken } = require("./gatekeepingMiddleware");

// add is admin here eventually
likedItemsRouter.get("/", requireToken, async (req, res, next) => {
  try {
    const allLikedItems = await LikedItem.findAll();
    res.send(allLikedItems).status(200);
  } catch (error) {
    next(error);
  }
});

likedItemsRouter.get("/:token", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.params.token);
    const userLikedItems = await LikedItem.findAll({
      where: {
        userId: user.id,
      },
    });
    res.send(userLikedItems).status(200);
  } catch (error) {
    next(error);
  }
});

likedItemsRouter.post(
  "/createProduct/:token/:productId",
  requireToken,
  async (req, res, next) => {
    try {
      const user = await User.findByToken(req.params.token);
      const findProduct = await Product.findOne({
        where: { id: req.params.productId },
      });
      const alreadyLiked = await LikedItem.findOne({
        where: { userId: user.id, productId: findProduct.id },
      });
      if (alreadyLiked) {
        res.send("Already like this plant").send(200);
      } else {
        const newLikedItem = await LikedItem.create({
          productId: findProduct.id,
          name: findProduct.name,
          imageUrl: findProduct.imageUrl,
          price: findProduct.price,
          description: findProduct.desc,
          userId: user.id,
        });
        res.send(newLikedItem).status(200);
      }
    } catch (error) {
      next(error);
    }
  }
);

likedItemsRouter.delete(
  "/delete/:token/:productName",
  requireToken,
  async (req, res, next) => {
    try {
      const user = await User.findByToken(req.params.token);
      const findProduct = await Product.findOne({
        where: { name: req.params.productName },
      });
      await LikedItem.destroy({
        where: { userId: user.id, productId: findProduct.id },
      });
      res.send(findProduct).status(200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = likedItemsRouter;
