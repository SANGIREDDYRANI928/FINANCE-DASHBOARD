import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Target,
  AlertCircle,
  CheckCircle,
  PiggyBank,
  ShoppingBag,
  Coffee,
  Zap,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { useApp } from '../../context/AppContext';
import {
  calculateTotals,
  calculateCategoryBreakdown,
  getTopSpendingCategory,
  calculateAverageTransaction,
} from '../../utils/calculations';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { categories, monthlyData } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';

const InsightCard = ({ icon: Icon, title, value, description, type = 'neutral' }) => {
  const colors = {
    positive: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    negative: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    neutral: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
  };

  return (
    <Card hover>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${colors[type]}`}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
};

const MonthlyComparison = () => {
  const { darkMode } = useTheme();
  const gridColor = darkMode ? '#374151' : '#e5e7eb';
  const textColor = darkMode ? '#9ca3af' : '#6b7280';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Comparison</CardTitle>
        <CardDescription>Income vs Expenses over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: textColor, fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: textColor, fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#fff',
                  border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value) => formatCurrency(value)}
              />
              <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const SpendingTips = ({ topCategory, savingsRate }) => {
  const tips = [];

  if (topCategory) {
    const categoryTips = {
      Food: {
        icon: Coffee,
        tip: 'Consider meal prepping to reduce food expenses',
      },
      Shopping: {
        icon: ShoppingBag,
        tip: 'Try the 24-hour rule before making non-essential purchases',
      },
      Entertainment: {
        icon: Zap,
        tip: 'Look for free alternatives for entertainment activities',
      },
    };

    const categoryTip = categoryTips[topCategory.category];
    if (categoryTip) {
      tips.push({
        icon: categoryTip.icon,
        title: `${topCategory.category} Spending`,
        description: categoryTip.tip,
        type: 'warning',
      });
    }
  }

  if (savingsRate < 20) {
    tips.push({
      icon: PiggyBank,
      title: 'Savings Goal',
      description: 'Try to save at least 20% of your income for financial security',
      type: 'warning',
    });
  } else {
    tips.push({
      icon: CheckCircle,
      title: 'Great Savings Rate!',
      description: `You're saving ${savingsRate.toFixed(1)}% of your income. Keep it up!`,
      type: 'positive',
    });
  }

  tips.push({
    icon: Target,
    title: 'Set Budget Limits',
    description: 'Consider setting monthly limits for your top spending categories',
    type: 'neutral',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Tips</CardTitle>
        <CardDescription>Personalized recommendations based on your spending</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50"
            >
              <div
                className={`p-2 rounded-lg ${
                  tip.type === 'positive'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                    : tip.type === 'warning'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600'
                    : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600'
                }`}
              >
                <tip.icon size={18} />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{tip.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const Insights = () => {
  const { transactions } = useApp();
  const totals = calculateTotals(transactions);
  const topCategory = getTopSpendingCategory(transactions);
  const avgExpense = calculateAverageTransaction(transactions, 'expense');
  const avgIncome = calculateAverageTransaction(transactions, 'income');
  
  const savingsRate = totals.income > 0
    ? ((totals.income - totals.expenses) / totals.income) * 100
    : 0;

  const expenseToIncomeRatio = totals.income > 0
    ? (totals.expenses / totals.income) * 100
    : 0;

  const insights = [
    {
      icon: TrendingUp,
      title: 'Highest Spending Category',
      value: topCategory ? topCategory.category : 'N/A',
      description: topCategory
        ? `You've spent ${formatCurrency(topCategory.amount)} on ${topCategory.category}`
        : 'No expense data available',
      type: 'warning',
    },
    {
      icon: PiggyBank,
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      description: savingsRate >= 20
        ? 'Great! You\'re on track with your savings'
        : 'Try to save at least 20% of your income',
      type: savingsRate >= 20 ? 'positive' : 'warning',
    },
    {
      icon: Target,
      title: 'Expense to Income Ratio',
      value: `${expenseToIncomeRatio.toFixed(1)}%`,
      description: expenseToIncomeRatio <= 70
        ? 'Your spending is within healthy limits'
        : 'Consider reducing expenses to improve savings',
      type: expenseToIncomeRatio <= 70 ? 'positive' : 'negative',
    },
    {
      icon: TrendingDown,
      title: 'Average Transaction',
      value: formatCurrency(avgExpense),
      description: `Your average expense is ${formatCurrency(avgExpense)} per transaction`,
      type: 'neutral',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <InsightCard key={index} {...insight} />
        ))}
      </div>

      {/* Charts and Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyComparison />
        <SpendingTips topCategory={topCategory} savingsRate={savingsRate} />
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
          <CardDescription>Overview of your financial health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-green-50 dark:bg-green-900/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Income</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {formatCurrency(totals.income)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Avg: {formatCurrency(avgIncome)}/transaction
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-red-50 dark:bg-red-900/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
                {formatCurrency(totals.expenses)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Avg: {formatCurrency(avgExpense)}/transaction
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-primary-50 dark:bg-primary-900/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">Net Balance</p>
              <p className={`text-3xl font-bold mt-2 ${
                totals.balance >= 0
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {formatCurrency(totals.balance)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {totals.balance >= 0 ? 'Positive balance' : 'Negative balance'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
