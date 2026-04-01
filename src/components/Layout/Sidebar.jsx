import React from 'react';
import {
  LayoutDashboard,
  Receipt,
  Lightbulb,
  Settings,
  User,
  Shield,
  Wallet,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
      transition-all duration-200
      ${active
        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }
    `}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

export const Sidebar = () => {
  const { activeView, setActiveView, role, setRole } = useApp();

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 dark:border-gray-700">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
          <Wallet size={22} className="text-white" />
        </div>
        <div>
          <h1 className="font-bold text-gray-900 dark:text-white">FinanceHub</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeView === item.id}
            onClick={() => setActiveView(item.id)}
          />
        ))}
      </nav>

      {/* Role Switcher */}
      <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-700">
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Role Simulation
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setRole('admin')}
              className={`
                flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all
                ${role === 'admin'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                }
              `}
            >
              Admin
            </button>
            <button
              onClick={() => setRole('viewer')}
              className={`
                flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all
                ${role === 'viewer'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                }
              `}
            >
              Viewer
            </button>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              John Doe
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {role}
            </p>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Settings size={18} className="text-gray-400" />
          </button>
        </div>
      </div>
    </aside>
  );
};
