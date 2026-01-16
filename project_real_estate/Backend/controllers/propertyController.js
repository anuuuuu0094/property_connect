const Property = require("../models/property");
const User = require("../models/User");

// Create new property (seller or agent)
exports.createProperty = async (req, res) => {
  try {
    const userId = req.user._id;
    const { role } = req.user;

    if (role !== "seller" && role !== "agent") {
      return res
        .status(403)
        .json({ message: "Only sellers or agents can list properties" });
    }

    const property = await Property.create({
      ...req.body,
      owner: userId, // ✅ matches schema
      agent: role === "agent" ? userId : undefined,
    });

    res.status(201).json(property);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all properties (for buyers)
exports.getAllProperties = async (req, res) => {
  try {
    const filters = {};
    const {
      city,
      state,
      country,
      listingType,
      propertyName,
      minPrice,
      maxPrice,
    } = req.query;

    if (city) filters["location.city"] = city;
    if (state) filters["location.state"] = state;
    if (country) filters["location.country"] = country;
    if (listingType) filters["listingType"] = listingType;
    if (propertyName) filters["propertyName"] = propertyName;
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(filters)
      .populate("owner", "name email")
      .populate("agent", "name email");

    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get single property (increment views)
exports.getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id)
      .populate("owner", "name email")
      .populate("agent", "name email");

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    property.views += 1;
    await property.save();

    res.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update property (only owner or agent)
exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (
      String(property.owner) !== String(userId) &&
      String(property.agent) !== String(userId)
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this property" });
    }

    Object.assign(property, req.body);
    await property.save();

    res.json(property);
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete property (only owner)
exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (String(property.owner) !== String(userId)) {
      return res
        .status(403)
        .json({ message: "Only the owner can delete this property" });
    }

    await property.deleteOne();

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: error.message });
  }
};








