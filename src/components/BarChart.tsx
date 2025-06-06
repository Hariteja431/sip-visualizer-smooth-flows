
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
  const formatYAxisTick = (value: any): string => {
    if (value >= 1000000) {
      return `₹${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(0)}K`;
    }
    return `₹${value}`;
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
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">Year {label}</p>
          <div className="space-y-1">
            <p className="text-sm text-gray-600 flex items-center">
              <span className="inline-block w-3 h-3 bg-blue-500 rounded mr-2"></span>
              Invested: {formatTooltipValue(payload[0].value)}
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="inline-block w-3 h-3 bg-green-500 rounded mr-2"></span>
              Total Value: {formatTooltipValue(payload[1].value)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const chartKey = React.useMemo(() => {
    return JSON.stringify(data.map(item => item.investedTillDate + item.estimatedValueTillDate));
  }, [data]);

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-semibold mb-8 text-gray-800 text-center">Growth Projection Over Time</h3>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            key={chartKey}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
            />
            <YAxis 
              tickFormatter={formatYAxisTick} 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            />
            <Bar 
              name="Invested Amount" 
              dataKey="investedTillDate" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
              animationDuration={1000} 
            />
            <Bar 
              name="Total Value" 
              dataKey="estimatedValueTillDate" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500} 
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
