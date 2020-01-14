const db = require("../models/index");

async function getShopItem(req, res, next) {
  const id = req.params.id;

  const shopItem = await db.ShopItem.findById({ _id: id })
    .select("-__v -createdAt -updatedAt")
    .lean({ virtuals: true })
    .exec()
    .catch(next);

  if (shopItem) {
    res.status(200).send({
      data: shopItem,
      error: null,
    });
  } else {
    const error = new Error("Something went wrong.");
    next(error);
  }
}

module.exports = {
  getShopItem,
};
