const {
  SchemaDirectiveVisitor,
  AuthenticationError,
} = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");

class AuthenticationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function(parent, args, ctx, info) {
      if (!ctx.user) {
        throw new AuthenticationError("Unauthorized");
      }

      return resolve(parent, args, ctx, info);
    };
  }
}

class AuthorizationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    const { role } = this.args;

    field.resolve = async function(parent, args, ctx, info) {
      if (ctx.user.role !== role) {
        throw new AuthenticationError("Incorrect Role");
      }

      return resolve(parent, args, ctx, info);
    };
  }
}

module.exports = {
  AuthenticationDirective,
  AuthorizationDirective,
};
