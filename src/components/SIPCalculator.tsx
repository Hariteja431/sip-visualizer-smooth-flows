
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Investment Calculator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your returns from SIP or Lumpsum investments and plan your financial future
          </p>
        </div>

        {/* Calculation Type Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-lg border">
            <button 
              className={`${calculationType === 'sip' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 hover:text-blue-500'} font-semibold text-lg px-8 py-3 rounded-full transition-all duration-300`}
              onClick={() => setCalculationType('sip')}
            >
              SIP Calculator
            </button>
            <button 
              className={`${calculationType === 'lumpsum' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 hover:text-blue-500'} font-semibold text-lg px-8 py-3 rounded-full transition-all duration-300`}
              onClick={() => setCalculationType('lumpsum')}
            >
              Lumpsum Calculator
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          {/* Input Controls */}
          <div className="xl:col-span-1">
            <Card className="h-fit shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
                  Investment Parameters
                </h2>
                
                <div className="space-y-8">
                  {calculationType === 'sip' ? (
                    <InputSlider
                      label="Monthly Investment"
                      value={monthlyInvestment}
                      onChange={(values) => setMonthlyInvestment(values[0])}
                      min={1000}
                      max={100000}
                      step={500}
                      valuePrefix="₹"
                    />
                  ) : (
                    <InputSlider
                      label="Lumpsum Amount"
                      value={lumpsumAmount}
                      onChange={(values) => setLumpsumAmount(values[0])}
                      min={10000}
                      max={10000000}
                      step={10000}
                      valuePrefix="₹"
                    />
                  )}

                  <InputSlider
                    label="Expected Return Rate (p.a)"
                    value={expectedReturn}
                    onChange={(values) => setExpectedReturn(values[0])}
                    min={1}
                    max={30}
                    step={0.5}
                    valueSuffix="%"
                  />

                  <InputSlider
                    label="Investment Period"
                    value={timePeriod}
                    onChange={(values) => setTimePeriod(values[0])}
                    min={1}
                    max={30}
                    step={1}
                    valueSuffix=" Years"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="xl:col-span-2 space-y-8">
            {/* Summary and Chart Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Result Summary */}
              <div>
                <ResultSummary 
                  investedAmount={results.investedAmount} 
                  estimatedReturns={results.estimatedReturns} 
                  totalValue={results.totalValue} 
                />
              </div>
              
              {/* Donut Chart */}
              <div>
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm h-full">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                      Investment Breakdown
                    </h3>
                    <DonutChart 
                      investedAmount={results.investedAmount} 
                      estimatedReturns={results.estimatedReturns} 
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Bar Chart */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <BarChart data={results.yearlyData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;
