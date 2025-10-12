const express = require("express");
const router = express.Router();
const inquiryController = require("../controllers/inquiryController");
const authMiddleware = require("../middleware/authMiddleware");

// Buyer
router.post("/", authMiddleware, inquiryController.createInquiry);
router.get("/my", authMiddleware, inquiryController.getMyInquiries);

// Seller
router.get("/seller", authMiddleware, inquiryController.getInquiriesForSeller);
router.put("/:inquiryId/status", authMiddleware, inquiryController.updateInquiryStatus);

module.exports = router;
