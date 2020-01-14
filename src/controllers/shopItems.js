const db = require("../models/index");
const {
  getRestCursorOptions,
  getRestFilterOptions,
} = require("../utils/helpers");

async function shopItems(req, res, next) {
  const after = req.query.after;
  const limit = req.query.limit;

  const cursorOptions = getRestCursorOptions(after);
  const filterOptions = getRestFilterOptions(limit);

  const shopItems = await db.ShopItem.find(cursorOptions, null, {
    sort: { _id: -1 },
    ...filterOptions,
  })
    .select("-__v -updatedAt -createdAt")
    .lean({ virtuals: true })
    .exec()
    .catch(next);

  const hasNextPage = shopItems.length > limit;

  // Remove the last one from the sorted results list
  const slicedShopItems = hasNextPage ? shopItems.slice(0, -1) : shopItems;

  res.status(200).send({
    data: { shopItems: slicedShopItems, hasNextPage },
    error: null,
  });
}

module.exports = {
  shopItems,
};
