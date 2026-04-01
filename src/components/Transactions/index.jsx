import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { TransactionFilters } from './TransactionFilters';
import { TransactionList } from './TransactionList';
import { TransactionForm } from './TransactionForm';
import { useApp } from '../../context/AppContext';

export const Transactions = () => {
  const { isAdmin, getFilteredTransactions } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  
  const filteredTransactions = getFilteredTransactions();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            All Transactions
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        {isAdmin && (
          <Button onClick={() => setShowAddModal(true)} icon={Plus}>
            Add Transaction
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <TransactionFilters />
      </Card>

      {/* Transaction List */}
      <Card padding={false}>
        <TransactionList />
      </Card>

      {/* Add Transaction Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Transaction"
      >
        <TransactionForm onClose={() => setShowAddModal(false)} />
      </Modal>
    </div>
  );
};
