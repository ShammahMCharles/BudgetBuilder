const mongoose = require("mongoose");

const financialProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    monthlyIncome: {
      type: Number,
      required: true,
      min: 0,
    },

    monthlyExpenses: {
      type: Number,
      required: true,
      min: 0,
    },

    savings: {
      type: Number,
      default: 0,
      min: 0,
    },

    debt: {
      type: Number,
      default: 0,
      min: 0,
    },

    emergencyFund: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "FinancialProfile",
  financialProfileSchema
);