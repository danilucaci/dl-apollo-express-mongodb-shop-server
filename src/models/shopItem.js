const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const shopItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
);

shopItemSchema.plugin(mongooseLeanVirtuals);
shopItemSchema.plugin(beautifyUnique);

const ShopItem = mongoose.model("shopitem", shopItemSchema);

module.exports = ShopItem;
