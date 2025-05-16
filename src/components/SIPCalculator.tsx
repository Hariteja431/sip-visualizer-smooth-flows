
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import InputSlider from './InputSlider';
import DonutChart from './DonutChart';
import BarChart from './BarChart';
import ResultSummary from './ResultSummary';
import { calculateSIP } from '@/utils/sipCalculator';

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [results, setResults] = useState({
    investedAmount: 0,
    estimatedReturns: 0,
    totalValue: 0,
    yearlyData: [] as Array<{
      year: number;
      investedTillDate: number;
      estimatedValueTillDate: number;
    }>
  });

  useEffect(() => {
    const result = calculateSIP(monthlyInvestment, expectedReturn, timePeriod);
    setResults(result);
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  return (
    <div className="max-w-5xl mx-auto px-4">
      <Card className="border shadow-sm overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-sip-light text-sip-dark font-bold text-sm px-4 py-1 rounded-full">SIP</div>
                <h2 className="text-xl text-gray-600">Lumpsum</h2>
              </div>

              <InputSlider
                label="Monthly investment"
                value={monthlyInvestment}
                onChange={(values) => setMonthlyInvestment(values[0])}
                min={1000}
                max={100000}
                step={500}
                valuePrefix="₹"
              />

              <InputSlider
                label="Expected return rate (p.a)"
                value={expectedReturn}
                onChange={(values) => setExpectedReturn(values[0])}
                min={1}
                max={30}
                step={0.5}
                valueSuffix="%"
              />

              <InputSlider
                label="Time period"
                value={timePeriod}
                onChange={(values) => setTimePeriod(values[0])}
                min={1}
                max={30}
                step={1}
                valueSuffix="Yr"
              />

              <DonutChart 
                investedAmount={results.investedAmount} 
                estimatedReturns={results.estimatedReturns} 
              />
            </div>

            <div className="space-y-4">
              <ResultSummary 
                investedAmount={results.investedAmount} 
                estimatedReturns={results.estimatedReturns} 
                totalValue={results.totalValue} 
              />
              
              <BarChart data={results.yearlyData} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SIPCalculator;
