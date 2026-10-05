const express = require("express");

const {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/budgetGoalController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getGoals);

router.get("/:id", getGoal);

router.post("/", createGoal);

router.put("/:id", updateGoal);

router.delete("/:id", deleteGoal);

module.exports = router;