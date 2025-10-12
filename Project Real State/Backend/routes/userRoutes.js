const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Auth
router.post("/register", userController.register);
router.post("/login", userController.login);

// Profile
router.get("/profile", authMiddleware, userController.getProfile);
router.put("/profile", authMiddleware, userController.updateProfile);

// Admin
router.get("/", authMiddleware, userController.getAllUsers);
router.delete("/:userId", authMiddleware, userController.deleteUser);

module.exports = router;
