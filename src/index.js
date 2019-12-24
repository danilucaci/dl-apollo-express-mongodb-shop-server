const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { json } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const config = require("./config/config");
const db = require("./models/index");
const schema = require("./graphql/schema");
const connect = require("./config/db/connect");
const userRouter = require("./routes/user");
const {
  verifyApiAuthHeaders,
  getApiFirebaseUser,
  getGraphQLFirebaseUser,
  apiSignup,
  apiSignin,
} = require("./utils/auth");

app.use(json());
app.use(helmet());
app.use(
  cors({
    origin: config.cors.frontend,
  }),
);
app.use(morgan("dev"));
app.post("/signup", apiSignup);
app.post("/signin", apiSignin);
app.use("/api", verifyApiAuthHeaders);
app.use("/api", getApiFirebaseUser);
app.use("/api/user", userRouter);
app.use((err, req, res, next) => {
  console.log("Error Handler Middleware: ");
  console.error(err);

  res.status(500).send();
});

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const user = await getGraphQLFirebaseUser(req);

    return { db, user };
  },
});

server.applyMiddleware({ app, path: "/graphql" });

connect()
  .then(() => {
    app.listen(config.apollo.port, () => {
      console.log(`REST API on http://localhost:${config.apollo.port}/api`);
      console.log(
        `GraphQL Server on http://localhost:${config.apollo.port}/graphql`,
      );
    });
  })
  .catch((e) => console.error(e));
