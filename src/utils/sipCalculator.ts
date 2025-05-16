
/**
 * Calculate SIP (Systematic Investment Plan) returns
 * 
 * @param monthlyInvestment - Monthly investment amount
 * @param annualReturnRate - Expected annual return rate (in percentage)
 * @param years - Investment time period in years
 * @returns Object containing invested amount, estimated returns and total value
 */
export const calculateSIP = (
  monthlyInvestment: number,
  annualReturnRate: number,
  years: number
): {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
  yearlyData: Array<{
    year: number;
    investedTillDate: number;
    estimatedValueTillDate: number;
  }>;
} => {
  const monthlyRate = annualReturnRate / 12 / 100;
  const totalMonths = years * 12;
  
  // Calculate total value using SIP formula: M × ((1 + r)^n - 1) / r × (1 + r)
  const totalValue = monthlyInvestment * 
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * 
    (1 + monthlyRate);
  
  const investedAmount = monthlyInvestment * totalMonths;
  const estimatedReturns = totalValue - investedAmount;

  // Calculate yearly data for the bar chart
  const yearlyData = [];
  
  for (let year = 1; year <= years; year++) {
    const monthsTillDate = year * 12;
    const investedTillDate = monthlyInvestment * monthsTillDate;
    
    const estimatedValueTillDate = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, monthsTillDate) - 1) / monthlyRate) * 
      (1 + monthlyRate);
      
    yearlyData.push({
      year,
      investedTillDate,
      estimatedValueTillDate
    });
  }

  return {
    investedAmount,
    estimatedReturns,
    totalValue,
    yearlyData
  };
};

/**
 * Calculate Lumpsum investment returns
 * 
 * @param principalAmount - Initial lumpsum investment amount
 * @param annualReturnRate - Expected annual return rate (in percentage)
 * @param years - Investment time period in years
 * @returns Object containing invested amount, estimated returns and total value
 */
export const calculateLumpsum = (
  principalAmount: number,
  annualReturnRate: number,
  years: number
): {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
  yearlyData: Array<{
    year: number;
    investedTillDate: number;
    estimatedValueTillDate: number;
  }>;
} => {
  const rate = annualReturnRate / 100;
  
  // Calculate total value using compound interest formula: P(1 + r)^n
  const totalValue = principalAmount * Math.pow(1 + rate, years);
  const estimatedReturns = totalValue - principalAmount;

  // Calculate yearly data for the bar chart
  const yearlyData = [];
  
  for (let year = 1; year <= years; year++) {
    const estimatedValueTillDate = principalAmount * Math.pow(1 + rate, year);
    
    yearlyData.push({
      year,
      investedTillDate: principalAmount, // In lumpsum, invested amount remains the same over time
      estimatedValueTillDate
    });
  }

  return {
    investedAmount: principalAmount,
    estimatedReturns,
    totalValue,
    yearlyData
  };
};

/**
 * Format currency amount to Indian Rupee format
 * 
 * @param amount - Amount to format
 * @returns Formatted amount string with ₹ symbol
 */
export const formatCurrency = (amount: number): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  return formatter.format(amount);
};
