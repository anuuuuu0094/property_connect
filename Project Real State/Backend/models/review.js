const mongoose = require("mongoose");
const property = require("./property");

const reviewSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

reviewSchema.index({ property: 1, user: 1 }, { unique: true }); // a user can review a property only once

module.exports = mongoose.model("Review", reviewSchema);
