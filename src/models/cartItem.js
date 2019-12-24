const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const cartItemSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "shopitem",
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

cartItemSchema.index({ item: 1, user: 1, size: 1 }, { unique: true });
// cartItemSchema.set("autoIndex", false);

cartItemSchema.plugin(mongooseLeanVirtuals);
cartItemSchema.plugin(beautifyUnique);

const CartItem = mongoose.model("cartitem", cartItemSchema);

module.exports = CartItem;
