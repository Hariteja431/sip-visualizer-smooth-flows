
import React from 'react';
import { formatCurrency } from '@/utils/sipCalculator';
import { TrendingUp, Banknote, Target } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm h-full">
      <CardContent className="p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-8 text-center">
          Investment Summary
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-3 rounded-full">
                <Banknote className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 font-medium">Invested Amount</p>
                <p className="text-xl font-bold text-gray-800">{formatCurrency(investedAmount)}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 font-medium">Estimated Returns</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(estimatedReturns)}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-full">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 font-medium">Total Value</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {formatCurrency(totalValue)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultSummary;
