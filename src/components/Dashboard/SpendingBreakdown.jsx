import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { useApp } from '../../context/AppContext';
import { calculateCategoryBreakdown } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { categories } from '../../data/mockData';
import { EmptyState } from '../ui/EmptyState';
import { PieChart as PieChartIcon } from 'lucide-react';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
        <p className="font-medium text-gray-900 dark:text-white">{data.name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {formatCurrency(data.value)}
        </p>
      </div>
    );
  }
  return null;
};

export const SpendingBreakdown = () => {
  const { transactions } = useApp();
  const breakdown = calculateCategoryBreakdown(transactions);

  const getCategoryColor = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat?.color || '#64748b';
  };

  const chartData = breakdown.map((item) => ({
    name: item.category,
    value: item.amount,
    color: getCategoryColor(item.category),
  }));

  if (chartData.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Spending Breakdown</CardTitle>
          <CardDescription>Your expenses by category</CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={PieChartIcon}
            title="No expenses yet"
            description="Add some expense transactions to see your spending breakdown."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Spending Breakdown</CardTitle>
        <CardDescription>Your expenses by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                innerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value) => (
                  <span className="text-sm text-gray-600 dark:text-gray-300">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
