const { gql } = require("apollo-server-express");

const defaultTypes = gql`
  directive @authenticated on FIELD_DEFINITION
  directive @authorized(role: Role! = ADMIN) on FIELD_DEFINITION

  interface Node {
    id: ID!
  }

  type Query {
    # Empty field required for merging gql schemas
    _: String
  }

  type Mutation {
    # Empty field required for merging gql schemas
    _: String
  }
`;

module.exports = defaultTypes;
