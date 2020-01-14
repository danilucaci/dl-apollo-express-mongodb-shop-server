const db = require("../models/index");

async function cart(req, res, next) {
  const user = req.user;

  try {
    const userCart = await db.CartItem.find({
      user: user.uid,
    })
      .select("-__v -createdAt -updatedAt")
      .populate("item", "-__v -createdAt -updatedAt")
      .lean({ virtuals: true })
      .exec()
      .catch(next);

    res.status(200).send({
      data: userCart,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteCartItem(req, res, next) {
  const id = req.params.id;

  await db.CartItem.findByIdAndDelete(id)
    .exec()
    .catch(next);

  res.status(204).end();
}

async function updateCartItem(req, res, next) {
  const id = req.params.id;
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(400).send({
      data: null,
      error: "Missing fields",
    });
  }

  await db.CartItem.findByIdAndUpdate(
    { _id: id },
    { quantity },
    { new: true },
  ).catch(next);

  res.status(204).end();
}

async function addCartItem(req, res, next) {
  const user = req.user;
  const { item, quantity, size } = req.body;

  if (!item && !quantity && !size) {
    return res.status(400).send({
      data: null,
      error: "Missing fields",
    });
  }

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
  )
    .populate("item")
    .catch(next);

  if (prevItem) {
    // Return 200 OK when an existing item is modified
    return res.status(200).send({
      data: prevItem,
      error: null,
    });
  }

  if (!prevItem) {
    const cartItem = await db.CartItem.create({
      item,
      quantity,
      size,
      user: user.uid,
    });

    await cartItem
      .populate("item")
      .execPopulate()
      .catch(next);

    // Return 201 Created when a new item is created
    return res.status(201).send({
      data: cartItem,
      error: null,
    });
  }

  const error = new Error("Something went wrong");
  next(error);
}

module.exports = { cart, deleteCartItem, updateCartItem, addCartItem };
