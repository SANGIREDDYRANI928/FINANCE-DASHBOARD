// Mock data for the finance dashboard

export const initialTransactions = [
  { id: 1, date: '2024-01-15', description: 'Salary Deposit', amount: 5000, category: 'Salary', type: 'income' },
  { id: 2, date: '2024-01-16', description: 'Grocery Shopping', amount: 150.50, category: 'Food', type: 'expense' },
  { id: 3, date: '2024-01-17', description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', type: 'expense' },
  { id: 4, date: '2024-01-18', description: 'Electricity Bill', amount: 85.00, category: 'Utilities', type: 'expense' },
  { id: 5, date: '2024-01-19', description: 'Freelance Payment', amount: 800, category: 'Freelance', type: 'income' },
  { id: 6, date: '2024-01-20', description: 'Restaurant Dinner', amount: 65.00, category: 'Food', type: 'expense' },
  { id: 7, date: '2024-01-21', description: 'Gas Station', amount: 45.00, category: 'Transportation', type: 'expense' },
  { id: 8, date: '2024-01-22', description: 'Online Course', amount: 29.99, category: 'Education', type: 'expense' },
  { id: 9, date: '2024-01-23', description: 'Gym Membership', amount: 50.00, category: 'Health', type: 'expense' },
  { id: 10, date: '2024-01-24', description: 'Client Project', amount: 1200, category: 'Freelance', type: 'income' },
  { id: 11, date: '2024-01-25', description: 'Coffee Shop', amount: 12.50, category: 'Food', type: 'expense' },
  { id: 12, date: '2024-01-26', description: 'Phone Bill', amount: 55.00, category: 'Utilities', type: 'expense' },
  { id: 13, date: '2024-01-27', description: 'Book Purchase', amount: 24.99, category: 'Education', type: 'expense' },
  { id: 14, date: '2024-01-28', description: 'Interest Income', amount: 25.50, category: 'Investment', type: 'income' },
  { id: 15, date: '2024-01-29', description: 'Uber Ride', amount: 18.00, category: 'Transportation', type: 'expense' },
  { id: 16, date: '2024-02-01', description: 'Salary Deposit', amount: 5000, category: 'Salary', type: 'income' },
  { id: 17, date: '2024-02-02', description: 'Internet Bill', amount: 60.00, category: 'Utilities', type: 'expense' },
  { id: 18, date: '2024-02-03', description: 'Grocery Shopping', amount: 180.25, category: 'Food', type: 'expense' },
  { id: 19, date: '2024-02-04', description: 'Movie Tickets', amount: 30.00, category: 'Entertainment', type: 'expense' },
  { id: 20, date: '2024-02-05', description: 'Doctor Visit', amount: 100.00, category: 'Health', type: 'expense' },
  { id: 21, date: '2024-02-06', description: 'Stock Dividend', amount: 150.00, category: 'Investment', type: 'income' },
  { id: 22, date: '2024-02-07', description: 'Amazon Purchase', amount: 89.99, category: 'Shopping', type: 'expense' },
  { id: 23, date: '2024-02-08', description: 'Parking Fee', amount: 15.00, category: 'Transportation', type: 'expense' },
  { id: 24, date: '2024-02-09', description: 'Spotify Premium', amount: 9.99, category: 'Entertainment', type: 'expense' },
  { id: 25, date: '2024-02-10', description: 'Freelance Project', amount: 600, category: 'Freelance', type: 'income' },
];

export const categories = [
  { value: 'Food', label: 'Food & Dining', color: '#ef4444' },
  { value: 'Transportation', label: 'Transportation', color: '#f97316' },
  { value: 'Utilities', label: 'Utilities', color: '#eab308' },
  { value: 'Entertainment', label: 'Entertainment', color: '#84cc16' },
  { value: 'Shopping', label: 'Shopping', color: '#22c55e' },
  { value: 'Health', label: 'Health & Fitness', color: '#14b8a6' },
  { value: 'Education', label: 'Education', color: '#06b6d4' },
  { value: 'Salary', label: 'Salary', color: '#0ea5e9' },
  { value: 'Freelance', label: 'Freelance', color: '#6366f1' },
  { value: 'Investment', label: 'Investment', color: '#8b5cf6' },
  { value: 'Other', label: 'Other', color: '#64748b' },
];

export const monthlyData = [
  { month: 'Aug', income: 5800, expenses: 3200, balance: 2600 },
  { month: 'Sep', income: 6200, expenses: 3800, balance: 2400 },
  { month: 'Oct', income: 5500, expenses: 3100, balance: 2400 },
  { month: 'Nov', income: 7000, expenses: 4200, balance: 2800 },
  { month: 'Dec', income: 6800, expenses: 5100, balance: 1700 },
  { month: 'Jan', income: 7025, expenses: 2847, balance: 4178 },
];
