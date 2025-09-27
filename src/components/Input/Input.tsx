import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  clearable?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', clearable = false, className = '', ...props }, ref) => {
    const [value, setValue] = useState(props.value || '');
    const [showPassword, setShowPassword] = useState(false);

    const handleClear = () => setValue('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      props.onChange?.(e);
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
      <div className={`relative flex items-center w-full ${className}`}>
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          {...props}
        />
        {clearable && value && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute right-2 text-gray-400 hover:text-[var(--actions-color)]
                     transition-all duration-300 ease-in-out
                     hover:scale-110 active:scale-95
                     rounded-full p-1
                     hover:rotate-90
                     ${value ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
          >
            <X size={18} />
          </button>
        )}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-2 ${clearable && value ? 'mr-6' : ''} 
                       text-gray-400 hover:text-[var(--actions-color)]
                       transition-all duration-300 ease-in-out
                       hover:scale-110 active:scale-95
                       rounded-full p-1
                       animate-in fade-in-0 zoom-in-95`}
          >
            <div
              className={`transition-all duration-300 ease-in-out ${showPassword ? 'rotate-180' : 'rotate-0'}`}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
