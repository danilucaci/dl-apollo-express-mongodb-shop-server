module.exports = {
  Query: {
    shopItem: async (_, { id }, { db }) => {
      return db.ShopItem.findById({ _id: id })
        .select("-__v -createdAt -updatedAt")
        .lean({ virtuals: true })
        .exec();
    },
    shopItems: async (_, __, { db }) => {
      return db.ShopItem.find()
        .select("-__v -createdAt -updatedAt")
        .lean({ virtuals: true })
        .exec();
    },
  },
  Mutation: {
    addShopItem: async (_, args, { db, user }) => {
      const {
        input: { name = "", description = "", image = "", price = 0 } = {},
      } = args;

      const shopItem = await db.ShopItem.create({
        name,
        description,
        image,
        price,
        seller: user.uid,
      });

      return shopItem;
    },
    updateShopItem: async (_, args, { db }) => {
      const { input: { id, name, description, image, price } = {} } = args;

      return db.ShopItem.findByIdAndUpdate(
        { _id: id },
        {
          name,
          description,
          image,
          price,
        },
        { new: true, omitUndefined: true },
      );
    },
    deleteShopItem: async (_, args, { db }) => {
      const { input: { id } = {} } = args;

      return db.ShopItem.findByIdAndDelete(id).exec();
    },
  },
  ShopItem: {
    seller: async (shopItem, _, { db }) => {
      return db.User.findOne({ _id: shopItem.seller })
        .select("-__v -createdAt -updatedAt -role")
        .lean({ virtuals: true })
        .exec();
    },
  },
};
