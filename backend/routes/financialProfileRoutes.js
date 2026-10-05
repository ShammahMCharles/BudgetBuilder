const express = require("express");

const {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/financialProfileController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getProfile);

router.post("/", createProfile);

router.put("/", updateProfile);

router.delete("/", deleteProfile);

module.exports = router;