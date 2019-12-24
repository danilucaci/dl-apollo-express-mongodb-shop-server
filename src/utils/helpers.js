function calculateCartTotal(cart = []) {
  return cart.reduce(
    (accum, curr) => curr.quantity * curr.item.price + accum,
    0,
  );
}

function calculateItemTotal(cartItem = {}) {
  return cartItem.item.price * cartItem.quantity;
}

module.exports = {
  calculateCartTotal,
  calculateItemTotal,
};
