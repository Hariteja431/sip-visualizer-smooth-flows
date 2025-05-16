
import React from 'react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface YearlyData {
  year: number;
  investedTillDate: number;
  estimatedValueTillDate: number;
}

interface BarChartProps {
  data: YearlyData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const formatYAxisTick = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value;
  };

  const formatTooltipValue = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
          <p className="font-medium">Year {label}</p>
          <p className="text-sm text-gray-600">
            <span className="inline-block w-3 h-3 bg-sip-primary mr-2"></span>
            Invested: {formatTooltipValue(payload[0].value)}
          </p>
          <p className="text-sm text-gray-600">
            <span className="inline-block w-3 h-3 bg-sip-secondary mr-2"></span>
            Value: {formatTooltipValue(payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full mt-8 animate-fade-in">
      <h3 className="text-lg font-medium mb-4 text-sip-heading">Growth Over Time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} />
          <YAxis tickFormatter={formatYAxisTick} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar name="Invested Amount" dataKey="investedTillDate" fill="#4ade80" animationDuration={1000} />
          <Bar name="Estimated Value" dataKey="estimatedValueTillDate" fill="#6366f1" animationDuration={1500} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
