module.exports = {
  Query: {
    cartItem: async (_, { id }, { db }) => {
      return db.CartItem.findById({ _id: id })
        .select("-__v -createdAt -updatedAt")
        .lean({ virtuals: true })
        .exec();
    },
    cartItems: async (_, __, { db }) => {
      return db.CartItem.find()
        .select("-__v -createdAt -updatedAt")
        .lean({ virtuals: true })
        .exec();
    },
  },
  Mutation: {
    addCartItem: async (_, args, { db, user }) => {
      const { input: { item, quantity, size } = {} } = args;

      const prevItem = await db.CartItem.findOneAndUpdate(
        {
          user: user.uid,
          item: item,
          size: size,
        },
        {
          $inc: { quantity: 1 },
        },
        { new: true },
      );

      if (prevItem) {
        return prevItem;
      }

      if (!prevItem) {
        const cartItem = await db.CartItem.create({
          item,
          quantity,
          size,
          user: user.uid,
        });

        return cartItem;
      }
    },
    updateCartItem: async (_, args, { db }) => {
      const { input: { id, quantity, size } = {} } = args;

      return db.CartItem.findByIdAndUpdate(
        { _id: id },
        { quantity, size },
        { new: true, omitUndefined: true },
      );
    },
    deleteCartItem: async (_, args, { db }) => {
      const { input: { id } = {} } = args;

      return db.CartItem.findByIdAndDelete(id).exec();
    },
  },
  CartItem: {
    item: async (cartItem, _, { db }) => {
      return db.ShopItem.findOne({ _id: cartItem.item })
        .select("-__v -createdAt -updatedAt -role")
        .lean({ virtuals: true })
        .exec();
    },
    user: async (cartItem, _, { db }) => {
      return db.User.findOne({ _id: cartItem.user })
        .select("-__v -createdAt -updatedAt -role")
        .lean({ virtuals: true })
        .exec();
    },
  },
};
