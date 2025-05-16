
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DonutChartProps {
  investedAmount: number;
  estimatedReturns: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ investedAmount, estimatedReturns }) => {
  const data = [
    { name: 'Invested amount', value: investedAmount },
    { name: 'Est. returns', value: estimatedReturns },
  ];
  
  const COLORS = ['#e0e7ff', '#6366f1'];

  return (
    <div className="h-80 w-full animate-scale-in">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
            animationDuration={1000}
            animationBegin={200}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => new Intl.NumberFormat('en-IN').format(value as number)} />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center" 
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;
