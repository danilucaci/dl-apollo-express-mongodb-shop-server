const db = require("../models/index");

const { calculateCartTotal, calculateItemTotal } = require("../utils/helpers");

async function orders(req, res, next) {
  const user = req.user;

  try {
    const orders = await db.Order.find({
      user: user.uid,
    })
      .sort({ updatedAt: -1 })
      .select("-__v")
      .populate("items", "-__v -createdAt -updatedAt")
      .lean({ virtuals: true })
      .exec()
      .catch(next);

    res.status(200).send({
      data: orders,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const user = req.user;

  // 1. Get the user’s cart
  const cartItems = await db.CartItem.find({
    user: user.uid,
  })
    .select("-__v -createdAt -updatedAt -role")
    .populate("item")
    .lean({ virtuals: true })
    .exec();

  if (cartItems.length === 0) {
    throw new Error("Please add some items to your cart");
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

  const insertedOrderItems = await db.OrderItem.insertMany(orderItems).catch(
    next,
  );
  const insertedOrderItemIDs = insertedOrderItems.map((item) => item.id);

  // 4. Create the order
  await db.Order.create({
    items: insertedOrderItemIDs,
    total: cartTotal,
    user: user.uid,
  }).catch(next);

  // 5. Remove the cart items to clear the user’s cart
  const cartItemIDs = cartItems.map((item) => item.id);

  const deleteCartItemsResult = await db.CartItem.deleteMany({
    _id: { $in: cartItemIDs },
  }).catch(next);

  if (
    deleteCartItemsResult.n === cartItemIDs.length &&
    deleteCartItemsResult.ok === 1 &&
    deleteCartItemsResult.deletedCount === cartItemIDs.length
  ) {
    return res.status(201).end();
  }

  throw new Error("Failed to create the order");
}

module.exports = { orders, addOrder };
