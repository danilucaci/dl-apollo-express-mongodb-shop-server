const gql = require("graphql-tag");

const shopItemSchema = gql`
  type ShopItem implements Node {
    id: ID!
    name: String!
    description: String!
    image: String
    price: Int!
  }

  type ShopItemConnection {
    """
    Total count of nodes.
    """
    totalCount: Int!
    """
    A list of edges.
    """
    edges: [ShopItemEdge!]!
    """
    A list of nodes.
    """
    nodes: [ShopItem!]!
    """
    Information to aid in pagination.
    """
    pageInfo: PageInfo!
  }

  type ShopItemEdge {
    """
    A cursor for use in pagination
    """
    cursor: String!
    """
    The item at the end of the edge
    """
    # This field cannot return a list.
    node: ShopItem!
  }

  type PageInfo {
    hasNextPage: Boolean!
    startCursor: String
    endCursor: String
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
    shopItems(
      first: Int
      before: String
      after: String
      skip: Int
    ): ShopItemConnection!
  }

  extend type Mutation {
    addShopItem(input: AddShopItemInput): ShopItem! @authenticated
    updateShopItem(input: UpdateShopItemInput): ShopItem! @authenticated
    deleteShopItem(input: DeleteShopItemInput): ShopItem! @authenticated
  }
`;

module.exports = shopItemSchema;
