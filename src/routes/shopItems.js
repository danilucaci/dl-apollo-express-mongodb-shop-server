const { Router } = require("express");
const shopItemsRouter = Router();

const shopItemsController = require("../controllers/shopItems");

shopItemsRouter.get("/", shopItemsController.shopItems);

module.exports = shopItemsRouter;
