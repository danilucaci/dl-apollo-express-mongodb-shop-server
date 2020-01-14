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
const shopItemsRouter = require("./routes/shopItems");
const shopItemRouter = require("./routes/shopItem");
const cartRouter = require("./routes/cart");
const ordersRouter = require("./routes/orders");
const {
  verifyApiAuthHeaders,
  getApiFirebaseUser,
  getGraphQLFirebaseUser,
  apiSignup,
} = require("./utils/auth");

// const seed = require("./config/db/seed");
// seed();

app.use(json());
app.use(helmet());
app.use(
  cors({
    origin: config.cors.frontend,
  }),
);
app.use(morgan("dev"));
app.post("/signup", apiSignup);
app.use("/shop-items", shopItemsRouter);
app.use("/shop-item", shopItemRouter);
app.use("/api", verifyApiAuthHeaders);
app.use("/api", getApiFirebaseUser);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);
app.use((err, req, res, next) => {
  console.log("Error Handler Middleware: ");
  console.error(err);

  if (req.headersSent) {
    // When you add a custom error handler,
    // you must delegate to the default Express error handler,
    // when the headers have already been sent to the client:
    return next(err);
  }

  res.status(500).send({
    data: null,
    error: "Something went wrong",
  });
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
