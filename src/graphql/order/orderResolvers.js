const { ApolloError } = require("apollo-server-express");

const {
  calculateCartTotal,
  calculateItemTotal,
} = require("../../utils/helpers");

module.exports = {
  Query: {
    order: async (_, { id }, { db }) => {
      return db.Order.findById({ _id: id })
        .select("-__v")
        .lean({ virtuals: true })
        .exec();
    },
    orders: async (_, __, { db }) => {
      return db.Order.find()
        .sort({ updatedAt: -1 })
        .select("-__v")
        .lean({ virtuals: true })
        .exec();
    },
  },
  Mutation: {
    addOrder: async (_, __, { db, user }) => {
      // 1. Get the user’s cart
      const cartItems = await db.CartItem.find({
        user: user.uid,
      })
        .select("-__v -createdAt -updatedAt -role")
        .populate("item")
        .lean({ virtuals: true })
        .exec();

      if (cartItems.length === 0) {
        throw new ApolloError("Please add some items to your cart");
      }

      // 2. Calculate the total cost of the order
      const cartTotal = calculateCartTotal(cartItems);

      // 3. Convert cart items to order items
      const orderItems = cartItems.reduce((accum, curr) => {
        return [
          ...accum,
          {
            name: curr.item.name,
            description: curr.item.description,
            image: curr.item.image,
            price: calculateItemTotal(curr),
            quantity: curr.quantity,
            size: curr.size,
            user: user.uid,
          },
        ];
      }, []);

      const insertedOrderItems = await db.OrderItem.insertMany(orderItems);
      const insertedOrderItemIDs = insertedOrderItems.map((item) => item.id);

      // 4. Create the order
      const newOrder = await db.Order.create({
        items: insertedOrderItemIDs,
        total: cartTotal,
        user: user.uid,
      });

      // 5. Remove the cart items to clear the user’s cart
      const cartItemIDs = cartItems.map((item) => item.id);

      const deleteCartItemsResult = await db.CartItem.deleteMany({
        _id: { $in: cartItemIDs },
      });

      if (
        deleteCartItemsResult.n === cartItemIDs.length &&
        deleteCartItemsResult.ok === 1 &&
        deleteCartItemsResult.deletedCount === cartItemIDs.length
      ) {
        return newOrder;
      }

      throw new ApolloError("Failed to create the order");
    },
    deleteOrder: async (_, args, { db }) => {
      const { input: { id } = {} } = args;

      const order = await db.Order.findById(id).exec();

      console.log({ order });

      const deleteOrderItemIDsResult = await db.OrderItem.deleteMany({
        _id: { $in: order.items },
      });

      console.log({ deleteOrderItemIDsResult });

      if (
        deleteOrderItemIDsResult.n === order.items.length &&
        deleteOrderItemIDsResult.ok === 1 &&
        deleteOrderItemIDsResult.deletedCount === order.items.length
      ) {
        return db.Order.findByIdAndDelete(id).exec();
      } else {
        throw new ApolloError("Failed to remove the order");
      }
    },
  },
  Order: {
    items: async (order, _, { db }) => {
      return db.OrderItem.find({
        _id: {
          $in: order.items,
        },
      })
        .select("-__v -createdAt -updatedAt -role")
        .lean({ virtuals: true })
        .exec();
    },
    user: async (orderItem, _, { db }) => {
      return db.User.findOne({ _id: orderItem.user })
        .select("-__v -createdAt -updatedAt -role")
        .lean({ virtuals: true })
        .exec();
    },
  },
};
