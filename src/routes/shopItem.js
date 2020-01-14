const { Router } = require("express");

const shopItemRouter = Router();

const shopItemController = require("../controllers/shopItem");

shopItemRouter.get("/:id", shopItemController.getShopItem);

module.exports = shopItemRouter;
