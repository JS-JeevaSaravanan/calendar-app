import React from 'react';

interface DateTimeFieldProps {
  id: string;
  label: string;
  value: Date;
  setValue: React.Dispatch<React.SetStateAction<Date>>;
}

const DateTimeField: React.FC<DateTimeFieldProps> = ({
  id,
  label,
  value,
  setValue,
}) => (
  <div className="mb-3">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type="datetime-local"
      value={value.toISOString().slice(0, 16)}
      onChange={(e) => setValue(new Date(e.target.value))}
      className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
      required
    />
  </div>
);

export default DateTimeField;
