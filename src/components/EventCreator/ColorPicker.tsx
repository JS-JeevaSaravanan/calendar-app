import React from 'react';
import { colorOptions } from '../../constants/colorOptions';

interface ColorPickerProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, setColor }) => (
  <div className="mb-4">
    <label htmlFor="color" className="block text-sm font-medium text-gray-700">
      Color
    </label>
    <div className="flex space-x-2">
      {colorOptions.map((option, index) => (
        <button
          key={index}
          type="button"
          style={{ backgroundColor: option }}
          onClick={() => setColor(option)}
          className={`w-8 h-8 rounded-full border-2 border-white ${color === option ? 'ring-2 ring-indigo-500' : ''}`}
        />
      ))}
    </div>
  </div>
);

export default ColorPicker;
