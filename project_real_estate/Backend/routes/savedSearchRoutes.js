const express = require("express");
const router = express.Router();
const savedSearchController = require("../controllers/savedSearchController");
const authMiddleware = require("../middleware/authMiddleware");

// Buyer only
router.post("/", authMiddleware, savedSearchController.createSavedSearch);
router.get("/", authMiddleware, savedSearchController.getMySavedSearches);
router.put("/:searchId", authMiddleware, savedSearchController.updateSavedSearch);
router.delete("/:searchId", authMiddleware, savedSearchController.deleteSavedSearch);

module.exports = router;
