const gql = require("graphql-tag");

const shopItemSchema = gql`
  type ShopItem implements Node {
    id: ID!
    name: String!
    description: String!
    image: String
    price: Int!
  }

  input AddShopItemInput {
    name: String!
    description: String!
    image: String
    price: Int!
  }

  input UpdateShopItemInput {
    id: ID!
    name: String
    description: String
    image: String
    price: Int
  }

  input DeleteShopItemInput {
    id: ID!
  }

  extend type Query {
    shopItem(id: ID!): ShopItem!
    shopItems: [ShopItem!]!
  }

  extend type Mutation {
    addShopItem(input: AddShopItemInput): ShopItem! @authenticated
    updateShopItem(input: UpdateShopItemInput): ShopItem! @authenticated
    deleteShopItem(input: DeleteShopItemInput): ShopItem! @authenticated
  }
`;

module.exports = shopItemSchema;
