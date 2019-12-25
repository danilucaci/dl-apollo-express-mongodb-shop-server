const { auth } = require("../../utils/auth");

module.exports = {
  Query: {
    currentUser: async (_, __, { user, db }) => {
      const currentUser = await db.User.findOne({ _id: user.uid })
        .lean({ virtuals: true })
        .exec();

      if (!currentUser) {
        return null;
      }

      return currentUser;
    },
    user: async (_, args, { db }) => {
      const user = await db.User.findById({ _id: args.id })
        .lean({ virtuals: true })
        .exec();

      return user;
    },
    users: async (_, __, { db }) => {
      const users = await db.User.find()
        .select("-__v -createdAt -updatedAt")
        .lean({ virtuals: true })
        .exec();

      return users;
    },
  },
  Mutation: {
    signup: async (_, args, { db }) => {
      const { input: { id, displayName, email, role, photoURL } = {} } = args;

      const currentUser = await db.User.findById(id)
        .lean({ virtuals: true })
        .exec();

      if (currentUser) {
        return currentUser;
      } else {
        const newUser = await db.User.create({
          _id: id,
          displayName,
          email,
          role,
          photoURL,
        });

        return newUser;
      }
    },
    updateCurrentUser: async (_, args, { db, user }) => {
      const { input: { displayName, photoURL } = {} } = args;

      const updatedUser = await db.User.findByIdAndUpdate(
        { _id: user.uid },
        { displayName, photoURL },
        { new: true, omitUndefined: true },
      )
        .lean({ virtuals: true })
        .exec();

      return updatedUser;
    },
    deleteUser: async (_, args, { db }) => {
      const { input: { id } = {} } = args;

      const removedUser = await db.User.findByIdAndDelete(id).exec();

      await auth.deleteUser(removedUser.id);

      return removedUser;
    },
  },
  User: {
    cart: async (user, _, { db }) => {
      return db.CartItem.find({
        user: user.id,
      })
        .select("-__v")
        .lean({ virtuals: true })
        .exec();
    },
    orders: async (user, _, { db }) => {
      return db.Order.find({
        user: user.id,
      })
        .sort({ updatedAt: -1 })
        .select("-__v")
        .lean({ virtuals: true })
        .exec();
    },
  },
};
