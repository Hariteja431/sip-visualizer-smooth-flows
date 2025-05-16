
import React from 'react';
import { formatCurrency } from '@/utils/sipCalculator';

interface ResultSummaryProps {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
}

const ResultSummary: React.FC<ResultSummaryProps> = ({
  investedAmount,
  estimatedReturns,
  totalValue
}) => {
  return (
    <div className="mt-6 bg-white rounded-lg p-6 border border-gray-200 shadow-sm animate-scale-in">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Invested amount</span>
          <span className="text-lg font-medium">{formatCurrency(investedAmount)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Est. returns</span>
          <span className="text-lg font-medium text-sip-secondary">{formatCurrency(estimatedReturns)}</span>
        </div>
        <div className="flex justify-between items-center border-t border-gray-200 pt-4">
          <span className="text-gray-800 font-medium">Total value</span>
          <span className="text-xl font-bold">{formatCurrency(totalValue)}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;
