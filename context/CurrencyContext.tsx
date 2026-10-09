'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  USD_TO_RWF_RATE,
  formatUsd,
  formatRwf,
  formatDualPrice,
  convertUsdToRwf,
  DualPrice,
} from '@/lib/currency';

export type Currency = 'USD' | 'RWF';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  rate: number;
  formatPrice: (amountInUSD: number, showBoth?: boolean) => string;
  formatDual: (amountInUSD: number) => DualPrice;
  formatUsd: (amount: number) => string;
  formatRwf: (amountInUSD: number) => string;
  usdToRwf: (usd: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('RWF');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mts_currency') as Currency;
      if (saved === 'USD' || saved === 'RWF') {
        setCurrencyState(saved);
      } else {
        // No saved preference — set RWF as the default and persist it
        setCurrencyState('RWF');
        localStorage.setItem('mts_currency', 'RWF');
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    try {
      localStorage.setItem('mts_currency', curr);
    } catch (e) {
      console.error(e);
    }
  };

  const formatPrice = (amountInUSD: number, showBoth: boolean = false): string => {
    if (showBoth) {
      return formatDualPrice(amountInUSD, currency).combined;
    }
    return currency === 'RWF' ? formatRwf(amountInUSD) : formatUsd(amountInUSD);
  };

  const formatDual = (amountInUSD: number): DualPrice => {
    return formatDualPrice(amountInUSD, currency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        rate: USD_TO_RWF_RATE,
        formatPrice,
        formatDual,
        formatUsd,
        formatRwf,
        usdToRwf: convertUsdToRwf,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
