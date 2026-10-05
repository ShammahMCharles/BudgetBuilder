const express = require("express");

const {
  getPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
  checkAffordability,
} = require("../controllers/purchaseItemController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getPurchases);

router.get("/:id", getPurchase);

router.post("/", createPurchase);

router.put("/:id", updatePurchase);

router.delete("/:id", deletePurchase);

router.get("/:id/affordability", checkAffordability);

module.exports = router;