const PurchaseItem = require("../models/PurchaseItem");

const FinancialProfile = require("../models/FinancialProfile");

const {
  calculatePurchaseAffordability,
} = require("../utils/financialCalculations");

const getPurchases = async (req, res) => {
  try {
    const purchases = await PurchaseItem.find({
      user: req.user,
    }).sort({ createdAt: -1 });

    res.json(purchases);
  } catch (error) {
    console.error("CREATE PURCHASE ERROR:", error);

    res.status(500).json({
      message: "Failed to retrieve purchases.",
      error: error.message,
    });
  }
};

const getPurchase = async (req, res) => {
  try {
    const purchase = await PurchaseItem.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!purchase) {
      return res.status(404).json({
        message: "Purchase not found.",
      });
    }

    res.json(purchase);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve purchase.",
      error: error.message,
    });
  }
};

const createPurchase = async (req, res) => {
  try {
    const purchase = await PurchaseItem.create({
      ...req.body,
      user: req.user,
    });

    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create purchase.",
      error: error.message,
    });
  }
};

const updatePurchase = async (req, res) => {
  try {
    const purchase =
      await PurchaseItem.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user,
        },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!purchase) {
      return res.status(404).json({
        message: "Purchase not found.",
      });
    }

    res.json(purchase);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update purchase.",
      error: error.message,
    });
  }
};

const deletePurchase = async (req, res) => {
  try {
    const purchase =
      await PurchaseItem.findOneAndDelete({
        _id: req.params.id,
        user: req.user,
      });

    if (!purchase) {
      return res.status(404).json({
        message: "Purchase not found.",
      });
    }

    res.json({
      message: "Purchase deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete purchase.",
      error: error.message,
    });
  }
};

const checkAffordability = async (req, res) => {
  try {
    const purchase = await PurchaseItem.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!purchase) {
      return res.status(404).json({
        message: "Purchase not found.",
      });
    }

    const profile = await FinancialProfile.findOne({
      user: req.user,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Create a financial profile first.",
      });
    }

    const result = calculatePurchaseAffordability(
      profile.monthlyIncome,
      profile.monthlyExpenses,
      purchase.monthlyPayment
    );

    res.json({
      purchase: purchase.name,
      price: purchase.price,
      monthlyPayment: purchase.monthlyPayment,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to calculate affordability.",
      error: error.message,
    });
  }
};

module.exports = {
  getPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
  checkAffordability,
};