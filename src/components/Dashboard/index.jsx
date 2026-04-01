import React from 'react';
import { SummaryCards } from './SummaryCards';
import { BalanceTrend } from './BalanceTrend';
import { SpendingBreakdown } from './SpendingBreakdown';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { getRecentTransactions } from '../../utils/calculations';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const RecentTransactions = () => {
  const { transactions, setActiveView } = useApp();
  const recentTransactions = getRecentTransactions(transactions, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <button
          onClick={() => setActiveView('transactions')}
          className="text-sm text-primary-500 hover:text-primary-600 font-medium"
        >
          View all
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    transaction.type === 'income'
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-red-100 dark:bg-red-900/30'
                  }`}
                >
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="text-green-600 dark:text-green-400" size={20} />
                  ) : (
                    <ArrowDownRight className="text-red-600 dark:text-red-400" size={20} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {transaction.category} • {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
              <p
                className={`font-semibold ${
                  transaction.type === 'income'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <SummaryCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceTrend />
        <SpendingBreakdown />
      </div>

      <RecentTransactions />
    </div>
  );
};
