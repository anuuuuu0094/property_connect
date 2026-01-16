const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    propertyName: {
      type: String,
      enum: ["house", "apartment", "townhouse", "land"],
      required: true,
    },
    listingType: {
      type: String,
      enum: ["rent", "sale"],
      required: true,
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    details: {
      bedrooms: { type: Number, required: true },
      bathrooms: { type: Number, required: true },
      area: { type: Number, required: true },
      yearBuilt: Number,
      amenities: [String],
    },
    images: [{ type: String, required: true }],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // main seller
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["active", "inactive", "pending", "sold"],
      default: "active",
    },
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
