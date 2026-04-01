import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialTransactions } from '../data/mockData';

const AppContext = createContext();

// Action types
const ACTIONS = {
  SET_TRANSACTIONS: 'SET_TRANSACTIONS',
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  SET_ROLE: 'SET_ROLE',
  SET_ACTIVE_VIEW: 'SET_ACTIVE_VIEW',
  SET_FILTERS: 'SET_FILTERS',
  RESET_FILTERS: 'RESET_FILTERS',
};

// Initial state
const initialFilters = {
  search: '',
  type: 'all',
  category: 'all',
  dateRange: 'all',
  sortBy: 'date',
  sortOrder: 'desc',
};

const initialState = {
  role: 'admin', // 'admin' or 'viewer'
  activeView: 'dashboard',
  filters: initialFilters,
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_ROLE:
      return { ...state, role: action.payload };
    case ACTIONS.SET_ACTIVE_VIEW:
      return { ...state, activeView: action.payload };
    case ACTIONS.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case ACTIONS.RESET_FILTERS:
      return { ...state, filters: initialFilters };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [transactions, setTransactions] = useLocalStorage('transactions', initialTransactions);

  // Transaction actions
  const addTransaction = useCallback((transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  }, [setTransactions]);

  const updateTransaction = useCallback((id, updates) => {
    setTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    );
  }, [setTransactions]);

  const deleteTransaction = useCallback((id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, [setTransactions]);

  // Role actions
  const setRole = useCallback((role) => {
    dispatch({ type: ACTIONS.SET_ROLE, payload: role });
  }, []);

  // Navigation actions
  const setActiveView = useCallback((view) => {
    dispatch({ type: ACTIONS.SET_ACTIVE_VIEW, payload: view });
  }, []);

  // Filter actions
  const setFilters = useCallback((filters) => {
    dispatch({ type: ACTIONS.SET_FILTERS, payload: filters });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_FILTERS });
  }, []);

  // Filter transactions based on current filters
  const getFilteredTransactions = useCallback(() => {
    let filtered = [...transactions];
    const { search, type, category, dateRange, sortBy, sortOrder } = state.filters;

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(searchLower) ||
        t.category.toLowerCase().includes(searchLower)
      );
    }

    // Type filter
    if (type !== 'all') {
      filtered = filtered.filter(t => t.type === type);
    }

    // Category filter
    if (category !== 'all') {
      filtered = filtered.filter(t => t.category === category);
    }

    // Date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      const startDate = new Date();
      
      switch (dateRange) {
        case '7days':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30days':
          startDate.setDate(now.getDate() - 30);
          break;
        case '90days':
          startDate.setDate(now.getDate() - 90);
          break;
        default:
          break;
      }
      
      if (dateRange !== 'all') {
        filtered = filtered.filter(t => new Date(t.date) >= startDate);
      }
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = new Date(a.date) - new Date(b.date);
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [transactions, state.filters]);

  // Export data
  const exportData = useCallback((format = 'json') => {
    const data = getFilteredTransactions();
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transactions_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      const headers = ['Date', 'Description', 'Amount', 'Category', 'Type'];
      const rows = data.map(t => [t.date, t.description, t.amount, t.category, t.type]);
      const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [getFilteredTransactions]);

  const value = {
    // State
    transactions,
    role: state.role,
    activeView: state.activeView,
    filters: state.filters,
    isAdmin: state.role === 'admin',
    
    // Actions
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setRole,
    setActiveView,
    setFilters,
    resetFilters,
    getFilteredTransactions,
    exportData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
