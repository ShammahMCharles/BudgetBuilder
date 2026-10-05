const mongoose = require("mongoose");

const purchaseItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      enum: [
        "car",
        "home",
        "technology",
        "travel",
        "education",
        "entertainment",
        "other",
      ],
      default: "other",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    monthlyPayment: {
      type: Number,
      default: 0,
      min: 0,
    },

    downPayment: {
      type: Number,
      default: 0,
      min: 0,
    },

    purchased: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PurchaseItem", purchaseItemSchema);