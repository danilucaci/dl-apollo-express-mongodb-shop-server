const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "orderitem",
      },
    ],
    user: {
      type: String,
      required: true,
      ref: "user",
    },
    total: {
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

orderSchema.plugin(mongooseLeanVirtuals);
orderSchema.plugin(beautifyUnique);

const ShopItem = mongoose.model("order", orderSchema);

module.exports = ShopItem;
