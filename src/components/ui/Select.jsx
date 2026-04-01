import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({
  label,
  options,
  value,
  onChange,
  className = '',
  placeholder = 'Select...',
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="input appearance-none pr-10 cursor-pointer"
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDown size={18} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};
