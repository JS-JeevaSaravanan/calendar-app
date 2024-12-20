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
}) => {
  const formatToLocalDateTime = (date: Date): string => {
    const offset = date.getTimezoneOffset() * 60000;
    const localTime = new Date(date.getTime() - offset);
    return localTime.toISOString().slice(0, 16);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const parsedDate = new Date(newValue);
    if (!isNaN(parsedDate.getTime())) {
      setValue(parsedDate);
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type="datetime-local"
        value={formatToLocalDateTime(value)}
        onChange={handleChange}
        className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        required
      />
    </div>
  );
};

export default DateTimeField;
