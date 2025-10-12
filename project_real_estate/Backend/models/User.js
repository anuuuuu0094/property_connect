
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["buyer", "seller", "agent", "admin"],
      default: "buyer",
    },
    profile: {
      firstName: String,
      lastName: String,
      phone: String,
      bio: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    agentProfile: {
      licenseNumber: String,
      company: String,
      yearOfExperience: Number,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);