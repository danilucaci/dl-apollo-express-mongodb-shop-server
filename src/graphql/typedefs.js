const defaultTypesSchema = require("./defaultTypes");
const userSchema = require("./user/userSchema");
const cartItemSchema = require("./cartItem/cartItemSchema");
const orderSchema = require("./order/orderSchema");
const orderItemSchema = require("./orderItem/orderItemSchema");
const shopItemSchema = require("./shopItem/shopItemSchema");

const typedefs = [
  defaultTypesSchema,
  userSchema,
  cartItemSchema,
  orderSchema,
  orderItemSchema,
  shopItemSchema,
];

module.exports = typedefs;
