const { ApolloError } = require("apollo-server-express");

const {
  toCursorHash,
  getCursorOptions,
  getFilterOptions,
  getShopItemsEdges,
} = require("../../utils/helpers");

module.exports = {
  Query: {
    shopItem: async (_, { id }, { db }) => {
      return db.ShopItem.findById({ _id: id })
        .select("-__v -createdAt -updatedAt")
        .lean({ virtuals: true })
        .exec();
    },
    shopItems: async (_, { first, skip, before, after }, { db }) => {
      const filterOptions = getFilterOptions({ first, skip });

      const cursorOptions = getCursorOptions({ before, after });

      if (first < 1) {
        throw new ApolloError(
          "Pagination parameter `first` must be a positive integer.",
        );
      }

      const totalCount = await db.ShopItem.estimatedDocumentCount();

      const shopItems = await db.ShopItem.find(cursorOptions, null, {
        sort: { _id: -1 },
        ...filterOptions,
      })
        .select("-__v -updatedAt -createdAt")
        .lean({ virtuals: true })
        .exec();

      const hasNextPage = shopItems.length > first;

      // Remove the last one from the sorted results list
      const slicedShopItems = hasNextPage ? shopItems.slice(0, -1) : shopItems;

      const shopItemsEdges = getShopItemsEdges(slicedShopItems);

      /**
       * @see https://facebook.github.io/relay/graphql/connections.htm#sel-EALFPDAAACFPyla
       *
       * `startCursor` and `endCursor` must be the cursors
       * corresponding to the first and last nodes in edges,
       * both of which return non‐null opaque strings.
       */
      const { 0: firstItem, length, [length - 1]: lastItem } = slicedShopItems;
      const startCursor = toCursorHash(firstItem.id);
      const endCursor = toCursorHash(lastItem.id);

      return {
        edges: shopItemsEdges,
        nodes: slicedShopItems,
        totalCount: totalCount,
        pageInfo: {
          hasNextPage: hasNextPage,
          startCursor: startCursor,
          endCursor: endCursor,
        },
      };
    },
  },
  Mutation: {
    addShopItem: async (_, args, { db }) => {
      const {
        input: { name = "", description = "", image = "", price = 0 } = {},
      } = args;

      const shopItem = await db.ShopItem.create({
        name,
        description,
        image,
        price,
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
};
