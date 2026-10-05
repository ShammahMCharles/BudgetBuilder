const FinancialProfile = require("../models/FinancialProfile");

const {
  calculateFinancialSummary,
} = require("../utils/financialCalculations");

const getProfile = async (req, res) => {
  try {
    const profile = await FinancialProfile.findOne({
      user: req.user,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Financial profile not found.",
      });
    }

    const summary = calculateFinancialSummary(profile);

    res.json({
      profile,
      summary,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve financial profile.",
      error: error.message,
    });
  }
};

const createProfile = async (req, res) => {
  try {
    const existingProfile =
      await FinancialProfile.findOne({
        user: req.user,
      });

    if (existingProfile) {
      return res.status(409).json({
        message: "Financial profile already exists.",
      });
    }

    const profile = await FinancialProfile.create({
      ...req.body,
      user: req.user,
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create financial profile.",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const profile =
      await FinancialProfile.findOneAndUpdate(
        { user: req.user },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!profile) {
      return res.status(404).json({
        message: "Financial profile not found.",
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update financial profile.",
      error: error.message,
    });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const profile =
      await FinancialProfile.findOneAndDelete({
        user: req.user,
      });

    if (!profile) {
      return res.status(404).json({
        message: "Financial profile not found.",
      });
    }

    res.json({
      message: "Financial profile deleted.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete financial profile.",
      error: error.message,
    });
  }
};

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};