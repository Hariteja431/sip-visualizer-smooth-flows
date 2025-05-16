
import React from 'react';
import { formatCurrency } from '@/utils/sipCalculator';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
  const handleInvestClick = () => {
    toast.success('Investment details saved successfully!', {
      description: `Total value after maturity: ${formatCurrency(totalValue)}`,
    });
  };

  return (
    <div className="mt-6 bg-white rounded-lg p-6 border border-gray-200 shadow-sm animate-scale-in">
      <div className="space-y-4 mb-6">
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
      
      <Button 
        onClick={handleInvestClick}
        className="w-full bg-sip-primary hover:bg-sip-dark text-white font-medium py-3 rounded-md transition-colors duration-300"
      >
        INVEST NOW
      </Button>
    </div>
  );
};

export default ResultSummary;
