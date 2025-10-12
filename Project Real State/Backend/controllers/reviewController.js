const Review = require("../models/review");
const Property = require("../models/property");
const User = require("../models/User");

// Add a review (buyers only)
exports.addReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const { propertyId, rating, comment } = req.body;

    // Check role
    const user = await User.findById(userId);
    if (!user || user.role !== "buyer") {
      return res.status(403).json({ message: "Only buyers can leave reviews" });
    }

    // Check property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Create review
    const review = await Review.create({
      property: propertyId,
      user: userId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "You already reviewed this property" });
    }
    res.status(500).json({ message: error.message });
  }
};

// Get reviews for a property
exports.getPropertyReviews = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const reviews = await Review.find({ property: propertyId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a review (only review owner)
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (String(review.user) !== String(userId)) {
      return res.status(403).json({ message: "You can only update your own review" });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    await review.save();

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a review (only review owner)
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (String(review.user) !== String(userId)) {
      return res.status(403).json({ message: "You can only delete your own review" });
    }

    await review.deleteOne();

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get average rating for a property
exports.getAverageRating = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const result = await Review.aggregate([
      { $match: { property: new mongoose.Types.ObjectId(propertyId) } },
      { $group: { _id: "$property", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
    ]);

    if (result.length === 0) {
      return res.json({ avgRating: 0, count: 0 });
    }

    res.json({ avgRating: result[0].avgRating, count: result[0].count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
