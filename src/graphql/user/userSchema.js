const gql = require("graphql-tag");

const userSchema = gql`
  enum Role {
    ADMIN
    MEMBER
  }

  type User implements Node {
    id: ID!
    displayName: String!
    email: String!
    role: Role!
    cart: [CartItem!]!
    orders: [Order!]!
  }

  input SignUpInput {
    id: ID!
    displayName: String!
    email: String!
    role: Role!
  }

  input UpdateCurrentUserInput {
    displayName: String!
  }

  input DeleteUserInput {
    id: ID!
  }

  extend type Query {
    user(id: ID!): User @authenticated
    users: [User!]! @authenticated
    currentUser: User! @authenticated
  }

  extend type Mutation {
    signup(input: SignUpInput): User!
    updateCurrentUser(input: UpdateCurrentUserInput): User! @authenticated
    deleteUser(input: DeleteUserInput): User! @authenticated
  }
`;

module.exports = userSchema;
