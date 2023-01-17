const likedItemsRouter = require("express").Router()
const { models: { LikedItems, User } } = require("../db/")
const Product = require('../db/models/Product')
const { requireToken } = require('./gatekeepingMiddleware')

// add isAdmin middleware
likedItemsRouter.get("/", async (req, res, next) => {
    try {
        const allLikedItems = await LikedItems.findAll()
        res.send(allLikedItems).status(200)
    } catch (error) {
        next(error)
    }
})
// add requireToken
likedItemsRouter.get("/:token", async (req, res, next) => {
    try {
        const user = await User.findByToken(req.params.token)
        const userLikedItems = await LikedItems.findAll({
            where: {
                userId: user.id
            }
        })
        res.send(userLikedItems).status(200)
    } catch (error) {
        next(error)
    }
})

likedItemsRouter.post("/createProduct/:token/:productId", async (req, res, next) => {
    try {
        const user = await User.findByToken(req.params.token)
        const findProduct = await Product.findOne({ where: { id: req.params.productId } })
        findProduct.userId = user.id
        const newLikedItem = await LikedItems.create({ productId: findProduct.id, name: findProduct.name, imageUrl: findProduct.imageUrl, price: findProduct.price, description: findProduct.desc, userId: findProduct.userId })
        res.send(newLikedItem).status(200)
    } catch (error) {
        next(error)
    }
})


module.exports = likedItemsRouter