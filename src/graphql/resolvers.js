const userResolvers = require("./user/userResolvers");
const cartItemResolvers = require("./cartItem/cartItemResolvers");
const orderResolvers = require("./order/orderResolvers");
const orderItemResolvers = require("./orderItem/orderItemResolvers");
const shopItemResolvers = require("./shopItem/shopItemResolvers");

const resolvers = [
  userResolvers,
  cartItemResolvers,
  orderResolvers,
  orderItemResolvers,
  shopItemResolvers,
];

module.exports = resolvers;
