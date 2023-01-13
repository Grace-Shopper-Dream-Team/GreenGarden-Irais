const likedItemsRouter = require("express").Router()
const { models: { LikedItems } } = require("../db/")
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
likedItemsRouter.get("/:userId", async (req, res, next) => {
    try {
        const userLikedItems = await LikedItems.findAll({
            where: {
                userId: req.params.userId
            }
        })
        res.send(userLikedItems).status(200)
    } catch (error) {
        next(error)
    }
})


module.exports = likedItemsRouter