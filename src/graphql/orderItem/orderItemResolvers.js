module.exports = {
  Query: {
    orderItem: async (_, { id }, { db }) => {
      return db.OrderItem.findById({ _id: id })
        .select("-__v -createdAt -updatedAt")
        .lean({ virtuals: true })
        .exec();
    },
    orderItems: async (_, __, { db }) => {
      return db.OrderItem.find()
        .select("-__v -createdAt -updatedAt")
        .lean({ virtuals: true })
        .exec();
    },
  },
  Mutation: {
    addOrderItem: async (_, args, { db }) => {
      const {
        input: {
          name = "",
          description = "",
          image = "",
          price = 0,
          quantity = 0,
          size = "M",
          user = "",
        } = {},
      } = args;

      const orderItem = await db.OrderItem.create({
        name,
        description,
        image,
        price,
        quantity,
        size,
        user,
      });

      return orderItem;
    },
    updateOrderItem: async (_, args, { db }) => {
      const {
        input: { id, name, description, image, price, size, quantity } = {},
      } = args;

      return db.OrderItem.findByIdAndUpdate(
        { _id: id },
        {
          name,
          description,
          image,
          price,
          size,
          quantity,
        },
        { new: true, omitUndefined: true },
      );
    },
    deleteOrderItem: async (_, args, { db }) => {
      const { input: { id } = {} } = args;

      return db.OrderItem.findByIdAndDelete(id).exec();
    },
  },
  OrderItem: {
    user: async (orderItem, _, { db }) => {
      return db.User.findOne({ _id: orderItem.user })
        .select("-__v -createdAt -updatedAt -role")
        .lean({ virtuals: true })
        .exec();
    },
  },
};
