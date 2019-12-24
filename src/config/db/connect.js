const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const config = require("../../config/config");

function connect() {
  return mongoose.connect(
    `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.name}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  );
}

module.exports = connect;
