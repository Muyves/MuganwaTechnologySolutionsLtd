/**
 * Currency conversion and formatting utilities for Muganwa Technology Solutions Ltd
 * Default standard rate: 1 USD = 1,350 RWF (Rwandan Francs)
 */

export const USD_TO_RWF_RATE = 1350;

export function convertUsdToRwf(usd: number): number {
  return Math.round(usd * USD_TO_RWF_RATE);
}

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatRwf(amountInUsd: number): string {
  const rwf = convertUsdToRwf(amountInUsd);
  return `${rwf.toLocaleString('en-US')} Rwf`;
}

export interface DualPrice {
  primary: string;
  secondary: string;
  combined: string;
  rawUsd: number;
  rawRwf: number;
}

export function formatDualPrice(amountInUsd: number, primaryCurrency: 'USD' | 'RWF' = 'USD'): DualPrice {
  const usd = formatUsd(amountInUsd);
  const rwf = formatRwf(amountInUsd);
  const rawRwf = convertUsdToRwf(amountInUsd);

  if (primaryCurrency === 'RWF') {
    return {
      primary: rwf,
      secondary: usd,
      combined: `${rwf} (${usd})`,
      rawUsd: amountInUsd,
      rawRwf,
    };
  }

  return {
    primary: usd,
    secondary: rwf,
    combined: `${usd} (${rwf})`,
    rawUsd: amountInUsd,
    rawRwf,
  };
}
