
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import InputSlider from './InputSlider';
import DonutChart from './DonutChart';
import BarChart from './BarChart';
import ResultSummary from './ResultSummary';
import { calculateSIP, calculateLumpsum } from '@/utils/sipCalculator';

const SIPCalculator = () => {
  const [calculationType, setCalculationType] = useState<'sip' | 'lumpsum'>('sip');
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [lumpsumAmount, setLumpsumAmount] = useState(1000000);
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

  // Recalculate whenever any input parameter changes
  useEffect(() => {
    let result;
    if (calculationType === 'sip') {
      result = calculateSIP(monthlyInvestment, expectedReturn, timePeriod);
    } else {
      result = calculateLumpsum(lumpsumAmount, expectedReturn, timePeriod);
    }
    setResults(result);
  }, [calculationType, monthlyInvestment, lumpsumAmount, expectedReturn, timePeriod]);

  return (
    <div className="max-w-5xl mx-auto px-4">
      <Card className="border shadow-sm overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <button 
                  className={`${calculationType === 'sip' ? 'bg-sip-light text-sip-dark' : 'bg-white text-gray-600'} font-bold text-sm px-4 py-1 rounded-full transition-colors`}
                  onClick={() => setCalculationType('sip')}
                >
                  SIP
                </button>
                <button 
                  className={`${calculationType === 'lumpsum' ? 'bg-sip-light text-sip-dark' : 'bg-white text-gray-600'} font-bold text-sm px-4 py-1 rounded-full transition-colors`}
                  onClick={() => setCalculationType('lumpsum')}
                >
                  Lumpsum
                </button>
              </div>

              {calculationType === 'sip' ? (
                <InputSlider
                  label="Monthly investment"
                  value={monthlyInvestment}
                  onChange={(values) => setMonthlyInvestment(values[0])}
                  min={1000}
                  max={100000}
                  step={500}
                  valuePrefix="₹"
                />
              ) : (
                <InputSlider
                  label="Lumpsum amount"
                  value={lumpsumAmount}
                  onChange={(values) => setLumpsumAmount(values[0])}
                  min={10000}
                  max={10000000}
                  step={10000}
                  valuePrefix="₹"
                />
              )}

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
