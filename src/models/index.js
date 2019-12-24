const User = require("./user");
const Order = require("./order");
const CartItem = require("./cartItem");
const ShopItem = require("./shopItem");
const OrderItem = require("./orderItem");

const db = {
  User,
  Order,
  CartItem,
  ShopItem,
  OrderItem,
};

module.exports = db;
