// Utility functions for calculations

export const calculateTotals = (transactions) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return {
    income,
    expenses,
    balance: income - expenses,
  };
};

export const calculateCategoryBreakdown = (transactions) => {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
  
  return Object.entries(expensesByCategory)
    .map(([category, amount]) => ({
      category,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount);
};

export const calculateMonthlyTotals = (transactions) => {
  const monthlyData = {};
  
  transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString('en-US', { month: 'short', year: '2-digit' });
    
    if (!monthlyData[month]) {
      monthlyData[month] = { month, income: 0, expenses: 0 };
    }
    
    if (t.type === 'income') {
      monthlyData[month].income += t.amount;
    } else {
      monthlyData[month].expenses += t.amount;
    }
  });
  
  return Object.values(monthlyData).map(m => ({
    ...m,
    balance: m.income - m.expenses,
  }));
};

export const getTopSpendingCategory = (transactions) => {
  const breakdown = calculateCategoryBreakdown(transactions);
  return breakdown.length > 0 ? breakdown[0] : null;
};

export const calculateAverageTransaction = (transactions, type) => {
  const filtered = transactions.filter(t => t.type === type);
  if (filtered.length === 0) return 0;
  return filtered.reduce((sum, t) => sum + t.amount, 0) / filtered.length;
};

export const getRecentTransactions = (transactions, limit = 5) => {
  return [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};

export const calculateGrowthRate = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};
