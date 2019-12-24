const { makeExecutableSchema } = require("graphql-tools");

const typedefs = require("./typedefs");
const resolvers = require("./resolvers");

const {
  AuthenticationDirective,
  AuthorizationDirective,
} = require("../graphql/directives");

const schema = makeExecutableSchema({
  typeDefs: typedefs,
  resolvers: resolvers,
  schemaDirectives: {
    authenticated: AuthenticationDirective,
    authorized: AuthorizationDirective,
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

module.exports = schema;
