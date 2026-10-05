const calculateFinancialSummary = ({
  monthlyIncome,
  monthlyExpenses,
  savings,
  debt,
}) => {
  const remainingIncome =
    monthlyIncome - monthlyExpenses;

  const savingsRate =
    monthlyIncome > 0
      ? (savings / monthlyIncome) * 100
      : 0;

  const debtToIncomeRatio =
    monthlyIncome > 0
      ? (debt / monthlyIncome) * 100
      : 0;

  return {
    monthlyIncome,
    monthlyExpenses,
    remainingIncome,
    savings,
    debt,
    savingsRate: Number(savingsRate.toFixed(2)),
    debtToIncomeRatio: Number(
      debtToIncomeRatio.toFixed(2)
    ),
  };
};

const calculateGoalProgress = (
  currentAmount,
  targetAmount
) => {
  if (targetAmount <= 0) {
    return 0;
  }

  const percentage =
    (currentAmount / targetAmount) * 100;

  return Math.min(
    Number(percentage.toFixed(2)),
    100
  );
};

const calculatePurchaseAffordability = (
  monthlyIncome,
  monthlyExpenses,
  monthlyPayment
) => {
  const remainingIncome =
    monthlyIncome - monthlyExpenses;

  return {
    remainingIncome,
    affordable:
      monthlyPayment <= remainingIncome,
  };
};

module.exports = {
  calculateFinancialSummary,
  calculateGoalProgress,
  calculatePurchaseAffordability,
};