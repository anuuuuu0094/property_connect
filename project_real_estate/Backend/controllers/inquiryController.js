const Inquiry = require("../models/Inquiry");
const Property = require("../models/property");
const User = require("../models/User");

// Buyer creates an inquiry
exports.createInquiry = async (req, res) => {
  try {
    const userId = req.user._id; // assuming req.user is set by auth middleware
    const { propertyId, message } = req.body;

    // Check if user is buyer
    const user = await User.findById(userId);
    if (!user || user.role !== "buyer") {
      return res.status(403).json({ message: "Only buyers can send inquiries" });
    }

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const inquiry = await Inquiry.create({
      property: propertyId,
      user: userId,
      message,
    });

    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all inquiries for a buyer (their own)
exports.getMyInquiries = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user || user.role !== "buyer") {
      return res.status(403).json({ message: "Only buyers can view their inquiries" });
    }

    const inquiries = await Inquiry.find({ user: userId })
      .populate("property")
      .sort({ createdAt: -1 });

    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all inquiries for seller's properties
exports.getInquiriesForSeller = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user || user.role !== "seller") {
      return res.status(403).json({ message: "Only sellers can view inquiries for their properties" });
    }

    // find inquiries where property belongs to this seller
    const inquiries = await Inquiry.find()
      .populate({
        path: "property",
        match: { user: userId }, // property.user === sellerId
      })
      .populate("user", "name email");

    // filter out inquiries where property didn’t match
    const filtered = inquiries.filter(i => i.property !== null);

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Seller updates inquiry status
exports.updateInquiryStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { inquiryId } = req.params;
    const { status } = req.body;

    const user = await User.findById(userId);
    if (!user || user.role !== "seller") {
      return res.status(403).json({ message: "Only sellers can update inquiry status" });
    }

    const inquiry = await Inquiry.findById(inquiryId).populate("property");
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    // check if seller owns the property
    if (String(inquiry.property.user) !== String(userId)) {
      return res.status(403).json({ message: "You can only update inquiries for your properties" });
    }

    inquiry.status = status;
    await inquiry.save();

    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
