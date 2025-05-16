
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
  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sip-text text-lg">{label}</label>
        <div className="bg-sip-light text-sip-dark px-4 py-2 rounded-md font-medium">
          {valuePrefix}{value}{valueSuffix}
        </div>
      </div>
      <Slider
        defaultValue={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={onChange}
        className="py-4"
      />
    </div>
  );
};

export default InputSlider;
