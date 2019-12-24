const gql = require("graphql-tag");

const orderSchema = gql`
  type Order implements Node {
    id: ID!
    items: [OrderItem!]!
    user: User!
    total: Int!
    createdAt: String!
    updatedAt: String!
  }

  input AddOrderInput {
    user: ID!
  }

  input DeleteOrderInput {
    id: ID!
  }

  extend type Query {
    order(id: ID!): Order! @authenticated
    orders: [Order!]! @authenticated
  }

  extend type Mutation {
    addOrder(input: AddOrderInput): Order! @authenticated
    deleteOrder(input: DeleteOrderInput): Order! @authenticated
  }
`;

module.exports = orderSchema;
