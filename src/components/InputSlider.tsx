
import React from 'react';
import { Slider } from "@/components/ui/slider";

interface InputSliderProps {
  label: string;
  value: number;
  onChange: (value: number[]) => void;
  min: number;
  max: number;
  step: number;
  valuePrefix?: string;
  valueSuffix?: string;
}

const InputSlider: React.FC<InputSliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  valuePrefix = '',
  valueSuffix = ''
}) => {
  const formatValue = (val: number) => {
    if (valuePrefix === '₹' && val >= 100000) {
      return `₹${(val / 100000).toFixed(1)}L`;
    } else if (valuePrefix === '₹' && val >= 1000) {
      return `₹${(val / 1000).toFixed(0)}K`;
    }
    return `${valuePrefix}${val.toLocaleString()}${valueSuffix}`;
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <label className="text-gray-700 font-medium text-lg">{label}</label>
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full font-semibold text-lg shadow-lg">
          {formatValue(value)}
        </div>
      </div>
      <div className="px-2">
        <Slider
          defaultValue={[value]}
          min={min}
          max={max}
          step={step}
          onValueChange={onChange}
          className="py-6"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      </div>
    </div>
  );
};

export default InputSlider;
