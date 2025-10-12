const mongoose = require("mongoose");

const savedSearhSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    criteria: { type: Object, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavedSearch", savedSearhSchema);
