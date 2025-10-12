const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

// Buyer actions
router.post("/", authMiddleware, reviewController.addReview);
router.put("/:reviewId", authMiddleware, reviewController.updateReview);
router.delete("/:reviewId", authMiddleware, reviewController.deleteReview);

// Public
router.get("/property/:propertyId", reviewController.getPropertyReviews);
router.get("/property/:propertyId/average", reviewController.getAverageRating);

module.exports = router;
