const { Router } = require("express");
const userRouter = Router();

const userController = require("../controllers/user");

/**
 * User route under /api
 * @example
 * /api/user
 */
userRouter.route("/:userId").get(userController.currentUser);

module.exports = userRouter;
