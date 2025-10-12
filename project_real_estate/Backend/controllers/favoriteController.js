const Favorite = require("../models/favorite");
const Property = require("../models/property");
const User = require("../models/User");

// Add property to favorites
exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user._id; // assuming user is set in req.user by auth middleware
    const propertyId = req.body.propertyId;

    // check if user is a buyer
    const user = await User.findById(userId);
    if (!user || user.role !== "buyer") {
      return res.status(403).json({ message: "Only buyers can favorite properties" });
    }

    // check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // create favorite (unique index prevents duplicates)
    const favorite = await Favorite.create({
      user: userId,
      property: propertyId,
    });

    res.status(201).json(favorite);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Already in favorites" });
    }
    res.status(500).json({ message: error.message });
  }
};

// Remove property from favorites
exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const propertyId = req.params.propertyId;

    const favorite = await Favorite.findOneAndDelete({ user: userId, property: propertyId });
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all favorites for logged-in buyer
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user || user.role !== "buyer") {
      return res.status(403).json({ message: "Only buyers can view favorites" });
    }

    const favorites = await Favorite.find({ user: userId }).populate("property");

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
