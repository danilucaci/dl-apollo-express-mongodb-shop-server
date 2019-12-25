const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const userSchema = new mongoose.Schema(
  {
    _id: String,
    displayName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "The email is required"],
    },
    role: {
      type: String,
      required: [true, "The role is required"],
    },
    photoURL: String,
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

userSchema.plugin(mongooseLeanVirtuals);
userSchema.plugin(beautifyUnique);

const User = mongoose.model("user", userSchema);

module.exports = User;
