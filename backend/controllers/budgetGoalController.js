const BudgetGoal = require("../models/BudgetGoal");

const {
  calculateGoalProgress,
} = require("../utils/financialCalculations");

const getGoals = async (req, res) => {
  try {
    const goals = await BudgetGoal.find({
      user: req.user,
    }).sort({ createdAt: -1 });

    const formattedGoals = goals.map((goal) => ({
      ...goal.toObject(),
      progress: calculateGoalProgress(
        goal.currentAmount,
        goal.targetAmount
      ),
    }));

    res.json(formattedGoals);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve goals.",
      error: error.message,
    });
  }
};

const getGoal = async (req, res) => {
  try {
    const goal = await BudgetGoal.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found.",
      });
    }

    res.json({
      ...goal.toObject(),
      progress: calculateGoalProgress(
        goal.currentAmount,
        goal.targetAmount
      ),
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve goal.",
      error: error.message,
    });
  }
};

const createGoal = async (req, res) => {
  try {
    const goal = await BudgetGoal.create({
      ...req.body,
      user: req.user,
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create goal.",
      error: error.message,
    });
  }
};

const updateGoal = async (req, res) => {
  try {
    const goal = await BudgetGoal.findOneAndUpdate(
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

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found.",
      });
    }

    res.json(goal);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update goal.",
      error: error.message,
    });
  }
};

const deleteGoal = async (req, res) => {
  try {
    const goal = await BudgetGoal.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found.",
      });
    }

    res.json({
      message: "Goal deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete goal.",
      error: error.message,
    });
  }
};

module.exports = {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
};