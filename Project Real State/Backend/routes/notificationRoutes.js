const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");

// Get user notifications
router.get("/", authMiddleware, notificationController.getMyNotifications);

// Mark as read
router.put("/:id/read", authMiddleware, notificationController.markAsRead);

// Mark all as read
router.put("/mark-all/read", authMiddleware, notificationController.markAllAsRead);

// Delete notification
router.delete("/:id", authMiddleware, notificationController.deleteNotification);

module.exports = router;
