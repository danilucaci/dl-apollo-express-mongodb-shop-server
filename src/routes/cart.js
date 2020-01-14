const { Router } = require("express");

const cartController = require("../controllers/cart");

const cartRouter = Router();

cartRouter.get("/", cartController.cart);
cartRouter.delete("/:id", cartController.deleteCartItem);
cartRouter.patch("/:id", cartController.updateCartItem);
cartRouter.post("/", cartController.addCartItem);

module.exports = cartRouter;
