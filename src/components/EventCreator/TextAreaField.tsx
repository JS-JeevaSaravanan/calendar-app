import React from 'react';

interface TextareaFieldProps {
  id: string;
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  label,
  value,
  setValue,
}) => (
  <div className="mb-3">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      id={id}
      placeholder={`Enter ${label.toLowerCase()}`}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      rows={3}
      className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
      required
    />
  </div>
);

export default TextareaField;
