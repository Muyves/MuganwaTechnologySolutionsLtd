'use client';

import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';

interface PriceTagProps {
  amount: number;
  compareAt?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showDual?: boolean;
  className?: string;
  secondaryClassName?: string;
  stacked?: boolean;
}

export default function PriceTag({
  amount,
  compareAt,
  size = 'md',
  showDual = true,
  className = '',
  secondaryClassName = '',
  stacked = false,
}: PriceTagProps) {
  const { formatDual } = useCurrency();
  const { primary, secondary } = formatDual(amount);

  const sizeClasses = {
    xs: 'text-xs font-bold',
    sm: 'text-sm font-bold',
    md: 'text-base font-extrabold',
    lg: 'text-lg sm:text-xl font-black',
    xl: 'text-2xl sm:text-3xl font-black',
  };

  const compareSizeClasses = {
    xs: 'text-[10px]',
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-xs sm:text-sm',
    xl: 'text-sm',
  };

  return (
    <div className={`inline-flex ${stacked ? 'flex-col items-start' : 'flex-wrap items-baseline gap-1.5 sm:gap-2'} ${className}`}>
      <div className="flex items-baseline gap-2">
        <span className={`text-white tracking-tight ${sizeClasses[size]}`}>
          {primary}
        </span>
        {compareAt && compareAt > amount && (
          <span className={`text-slate-500 line-through font-normal ${compareSizeClasses[size]}`}>
            {formatDual(compareAt).primary}
          </span>
        )}
      </div>
      {showDual && (
        <span className={`text-[11px] font-semibold text-mts-teal-glow/90 whitespace-nowrap ${secondaryClassName}`}>
          ({secondary})
        </span>
      )}
    </div>
  );
}
