import React from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { useApp } from '../../context/AppContext';
import { calculateTotals, calculateGrowthRate } from '../../utils/calculations';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const SummaryCard = ({ title, value, change, changeType, icon: Icon, iconBg, iconColor }) => {
  const isPositive = changeType === 'positive' || change >= 0;
  
  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              <span className="text-sm font-medium">
                {formatPercentage(Math.abs(change))}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconBg}`}>
          <Icon size={24} className={iconColor} />
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-10 ${iconBg}`} />
    </Card>
  );
};

export const SummaryCards = () => {
  const { transactions } = useApp();
  const totals = calculateTotals(transactions);
  
  // Calculate mock growth rates (in real app, compare with previous period)
  const balanceGrowth = 12.5;
  const incomeGrowth = 8.2;
  const expenseGrowth = -5.3;

  const cards = [
    {
      title: 'Total Balance',
      value: formatCurrency(totals.balance),
      change: balanceGrowth,
      changeType: 'positive',
      icon: Wallet,
      iconBg: 'bg-primary-100 dark:bg-primary-900/30',
      iconColor: 'text-primary-600 dark:text-primary-400',
    },
    {
      title: 'Total Income',
      value: formatCurrency(totals.income),
      change: incomeGrowth,
      changeType: 'positive',
      icon: TrendingUp,
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(totals.expenses),
      change: expenseGrowth,
      changeType: 'negative',
      icon: TrendingDown,
      iconBg: 'bg-red-100 dark:bg-red-900/30',
      iconColor: 'text-red-600 dark:text-red-400',
    },
    {
      title: 'Transactions',
      value: transactions.length.toString(),
      icon: CreditCard,
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {cards.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  );
};
