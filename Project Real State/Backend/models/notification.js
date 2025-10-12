const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    type: {
      type: String,
      enum: ["info", "alert", "new_property", "price_drop", "new_inquiry"],
      default: "info",
    },
    relatedEntityType: {
      type: String,
      enum: ["Property", "Inquiry", null],
      required: true,
    },
    relatedEntityID: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
