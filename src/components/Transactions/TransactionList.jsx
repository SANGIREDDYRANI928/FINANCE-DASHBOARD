import React, { useState } from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  Edit2,
  Trash2,
  MoreVertical,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { categories } from '../../data/mockData';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import { Modal } from '../ui/Modal';
import { TransactionForm } from './TransactionForm';

const TransactionRow = ({ transaction, onEdit, onDelete, isAdmin }) => {
  const [showActions, setShowActions] = useState(false);
  
  const getCategoryColor = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat?.color || '#64748b';
  };

  return (
    <div
      className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-xl group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Icon */}
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
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

        {/* Details */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 dark:text-white truncate">
            {transaction.description}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${getCategoryColor(transaction.category)}20`,
                color: getCategoryColor(transaction.category),
              }}
            >
              {transaction.category}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(transaction.date)}
            </span>
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className="flex items-center gap-4">
        <p
          className={`font-semibold text-right ${
            transaction.type === 'income'
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {transaction.type === 'income' ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </p>

        {/* Actions */}
        {isAdmin && (
          <div
            className={`flex gap-1 transition-opacity ${
              showActions ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(transaction)}
              className="p-2"
            >
              <Edit2 size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(transaction.id)}
              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export const TransactionList = () => {
  const { getFilteredTransactions, deleteTransaction, isAdmin } = useApp();
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const transactions = getFilteredTransactions();

  const handleDelete = (id) => {
    deleteTransaction(id);
    setShowDeleteConfirm(null);
  };

  if (transactions.length === 0) {
    return (
      <EmptyState
        title="No transactions found"
        description="Try adjusting your filters or add a new transaction to get started."
      />
    );
  }

  return (
    <>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {transactions.map((transaction) => (
          <TransactionRow
            key={transaction.id}
            transaction={transaction}
            onEdit={setEditingTransaction}
            onDelete={setShowDeleteConfirm}
            isAdmin={isAdmin}
          />
        ))}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
        title="Edit Transaction"
      >
        <TransactionForm
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        title="Delete Transaction"
        size="sm"
      >
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete this transaction? This action cannot be
          undone.
        </p>
        <div className="flex gap-3">
          <Button
            variant="danger"
            onClick={() => handleDelete(showDeleteConfirm)}
            className="flex-1"
          >
            Delete
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowDeleteConfirm(null)}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
