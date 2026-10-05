//DNS CONNECTION FIX
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();
require("./config/db-connection");

const authRoutes = require("./routes/authRoutes");
const financialProfileRoutes = require("./routes/financialProfileRoutes");
const budgetGoalRoutes = require("./routes/budgetGoalRoutes");
const purchaseItemRoutes = require("./routes/purchaseItemRoutes");

const app = express();

const PORT = process.env.PORT || 3001;

//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Test route
app.get("/", (req, res) => {
  res.json({
    message: "BudgetBuilder API is running",
  });
});

//API routes
app.use("/api/auth", authRoutes);
app.use("/api/financial-profile", financialProfileRoutes);
app.use("/api/budget-goals", budgetGoalRoutes);
app.use("/api/purchase-items", purchaseItemRoutes);

//Start server
app.listen(PORT, () => {
  console.log(`Server is listening @  http://localhost:${PORT}`);
});
