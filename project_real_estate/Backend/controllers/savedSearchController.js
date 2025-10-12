const SavedSearch = require("../models/savedsearch");
const User = require("../models/User");

// Create a saved search (buyers only)
exports.createSavedSearch = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, criteria } = req.body;

    const user = await User.findById(userId);
    if (!user || user.role !== "buyer") {
      return res.status(403).json({ message: "Only buyers can save searches" });
    }

    const savedSearch = await SavedSearch.create({
      user: userId,
      name,
      criteria,
    });

    res.status(201).json(savedSearch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all saved searches for logged-in buyer
exports.getMySavedSearches = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user || user.role !== "buyer") {
      return res.status(403).json({ message: "Only buyers can view saved searches" });
    }

    const searches = await SavedSearch.find({ user: userId }).sort({ createdAt: -1 });
    res.json(searches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a saved search
exports.updateSavedSearch = async (req, res) => {
  try {
    const { searchId } = req.params;
    const userId = req.user._id;

    const savedSearch = await SavedSearch.findOne({ _id: searchId, user: userId });
    if (!savedSearch) {
      return res.status(404).json({ message: "Saved search not found" });
    }

    savedSearch.name = req.body.name || savedSearch.name;
    savedSearch.criteria = req.body.criteria || savedSearch.criteria;

    await savedSearch.save();

    res.json(savedSearch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a saved search
exports.deleteSavedSearch = async (req, res) => {
  try {
    const { searchId } = req.params;
    const userId = req.user._id;

    const savedSearch = await SavedSearch.findOneAndDelete({ _id: searchId, user: userId });
    if (!savedSearch) {
      return res.status(404).json({ message: "Saved search not found" });
    }

    res.json({ message: "Saved search deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
