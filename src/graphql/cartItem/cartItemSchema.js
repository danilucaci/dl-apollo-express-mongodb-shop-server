const gql = require("graphql-tag");

const cartItemSchema = gql`
  enum Size {
    XS
    S
    M
    L
    XL
    XXL
    XXXL
  }

  type CartItem implements Node {
    id: ID!
    item: ShopItem!
    quantity: Int!
    size: Size!
    user: User!
  }

  input AddCartItemInput {
    item: ID!
    quantity: Int!
    size: Size!
  }

  input UpdateCartItemInput {
    id: ID!
    quantity: Int
    size: Size
  }

  input DeleteCartItemInput {
    id: ID!
  }

  extend type Query {
    cartItem(id: ID!): CartItem! @authenticated
    cartItems: [CartItem!]! @authenticated
  }

  extend type Mutation {
    addCartItem(input: AddCartItemInput): CartItem! @authenticated
    updateCartItem(input: UpdateCartItemInput): CartItem! @authenticated
    deleteCartItem(input: DeleteCartItemInput): CartItem! @authenticated
  }
`;

module.exports = cartItemSchema;
