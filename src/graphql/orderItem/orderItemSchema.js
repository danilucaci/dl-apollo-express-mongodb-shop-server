const gql = require("graphql-tag");

const orderItemSchema = gql`
  type OrderItem implements Node {
    id: ID!
    name: String!
    description: String!
    image: String
    price: Int!
    quantity: Int!
    size: Size!
    user: User!
  }

  input AddOrderItemInput {
    name: String!
    description: String!
    image: String
    price: Int!
    quantity: Int!
    size: Size!
    user: ID!
  }

  input UpdateOrderItemInput {
    id: ID!
    name: String
    description: String
    image: String
    price: Int
    quantity: Int
    size: Size
    user: ID
  }

  input DeleteOrderItemInput {
    id: ID!
  }

  extend type Query {
    orderItem(id: ID!): OrderItem! @authenticated
    orderItems: [OrderItem!]! @authenticated
  }

  extend type Mutation {
    addOrderItem(input: AddOrderItemInput): OrderItem! @authenticated
    updateOrderItem(input: UpdateOrderItemInput): OrderItem! @authenticated
    deleteOrderItem(input: DeleteOrderItemInput): OrderItem! @authenticated
  }
`;

module.exports = orderItemSchema;
