// const express = require("express");
// const router = express.Router();
// const propertyController = require("../controllers/propertyController");
// const authMiddleware = require("../middleware/authMiddleware");

// // Public
// router.get("/", propertyController.getAllProperties);
// router.get("/:id", propertyController.getPropertyById);

// // Authenticated (seller/agent)
// router.post("/", authMiddleware, propertyController.createProperty);
// router.put("/:id", authMiddleware, propertyController.updateProperty);
// router.delete("/:id", authMiddleware, propertyController.deleteProperty);

// module.exports = router;




const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const authMiddleware = require("../middleware/authMiddleware");

// Public
router.get("/", propertyController.getAllProperties);
router.get("/:id", propertyController.getPropertyById);

// Authenticated (seller/agent)
router.post("/", authMiddleware, propertyController.createProperty);
router.put("/:id", authMiddleware, propertyController.updateProperty);
router.delete("/:id", authMiddleware, propertyController.deleteProperty);

module.exports = router;
