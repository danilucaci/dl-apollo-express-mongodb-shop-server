const { Router } = require("express");

const ordersRouter = Router();

const ordersController = require("../controllers/orders");

ordersRouter.get("/", ordersController.orders);
ordersRouter.post("/", ordersController.addOrder);

module.exports = ordersRouter;
