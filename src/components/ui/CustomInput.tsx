
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, ...props }, ref) => {
    const inputClasses = `flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`;
    
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          className={inputClasses}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
