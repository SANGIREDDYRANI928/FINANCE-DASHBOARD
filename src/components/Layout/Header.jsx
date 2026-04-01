import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Sun,
  Moon,
  Search,
  Download,
  X,
  LayoutDashboard,
  Receipt,
  Lightbulb,
  Wallet,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';

export const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { activeView, setActiveView, exportData, isAdmin } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
  ];

  const titles = {
    dashboard: 'Dashboard Overview',
    transactions: 'Transactions',
    insights: 'Financial Insights',
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 lg:px-8 py-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <Menu size={24} className="text-gray-600 dark:text-gray-300" />
          </button>

          {/* Title */}
          <div className="hidden lg:block">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {titles[activeView]}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome back! Here's your financial summary.
            </p>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <Wallet size={18} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white">FinanceHub</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isAdmin && (
              <div className="hidden sm:flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => exportData('csv')}
                  icon={Download}
                >
                  <span className="hidden md:inline">Export CSV</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => exportData('json')}
                  icon={Download}
                >
                  <span className="hidden md:inline">Export JSON</span>
                </Button>
              </div>
            )}
            
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {darkMode ? (
                <Sun size={20} className="text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon size={20} className="text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative">
              <Bell size={20} className="text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-800 animate-slide-right">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                  <Wallet size={18} className="text-white" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white">FinanceHub</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
                    transition-all duration-200
                    ${activeView === item.id
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
