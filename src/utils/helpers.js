function calculateCartTotal(cart = []) {
  return cart.reduce(
    (accum, curr) => curr.quantity * curr.item.price + accum,
    0,
  );
}

function calculateItemTotal(cartItem = {}) {
  return cartItem.item.price * cartItem.quantity;
}

function toCursorHash(string) {
  return Buffer.from(string).toString("base64");
}

function fromCursorHash(string) {
  return Buffer.from(string, "base64").toString("ascii");
}

function getCursorOptions({ before, after }) {
  let options = {};

  if (after && !before) {
    options = {
      _id: {
        $lt: fromCursorHash(after),
      },
    };
  }

  if (before && !after) {
    options = {
      _id: {
        $gt: fromCursorHash(before),
      },
    };
  }

  if (before && after) {
    options = {
      _id: {
        $gt: fromCursorHash(before),
        $lt: fromCursorHash(after),
      },
    };
  }

  return options;
}

function getFilterOptions({ first, skip }) {
  let filterOptions = {};

  if (first) {
    filterOptions = {
      limit: first + 1,
    };
  }

  if (skip) {
    filterOptions.skip = skip;
  }

  return filterOptions;
}

function getShopItemsEdges(arr) {
  /**
   * @see https://facebook.github.io/relay/graphql/connections.htm#sel-EAJJFDBAADDIBlvM
   *
   * When `before`: cursor is used, the edge closest to cursor must come `last` in the result edges.
   * When `after`: cursor is used, the edge closest to cursor must come `first` in the result edges.
   */
  return arr.map((item) => ({
    cursor: toCursorHash(item.id),
    node: item,
  }));
}

module.exports = {
  calculateCartTotal,
  calculateItemTotal,
  toCursorHash,
  fromCursorHash,
  getCursorOptions,
  getFilterOptions,
  getShopItemsEdges,
};
