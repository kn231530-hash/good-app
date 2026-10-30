import React from 'react';

interface CurrencyProps {
  amount: number;
  className?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  strikeThrough?: boolean;
}

export const Currency: React.FC<CurrencyProps> = ({
  amount,
  className = '',
  size = 'base',
  strikeThrough = false
}) => {
  const sizeClasses = {
    sm: 'text-xs',
    base: 'text-sm font-bold',
    lg: 'text-base font-bold',
    xl: 'text-xl font-extrabold tracking-tight',
    '2xl': 'text-2xl font-extrabold tracking-tight'
  }[size];

  return (
    <span
      className={`inline-flex items-baseline font-['Plus_Jakarta_Sans',sans-serif] ${sizeClasses} ${
        strikeThrough ? 'line-through text-slate-400 font-normal' : 'text-[#0F172A]'
      } ${className}`}
    >
      <span className="text-[0.8em] font-semibold opacity-80 mr-0.5 select-none">$</span>
      <span>{amount.toFixed(2)}</span>
    </span>
  );
};
