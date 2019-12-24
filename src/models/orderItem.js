const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const orderItemSchema = new mongoose.Schema(
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
    },
    quantity: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      default: "M",
    },
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: String,
      required: true,
      ref: "user",
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

orderItemSchema.plugin(mongooseLeanVirtuals);
orderItemSchema.plugin(beautifyUnique);

const CartItem = mongoose.model("orderitem", orderItemSchema);

module.exports = CartItem;
