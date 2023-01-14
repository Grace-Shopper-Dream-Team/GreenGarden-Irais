const likedItemsRouter = require("express").Router()
const { models: { LikedItems, User } } = require("../db/")
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


module.exports = likedItemsRouter