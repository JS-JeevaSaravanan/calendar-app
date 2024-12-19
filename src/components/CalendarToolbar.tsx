import React from 'react';
import { View } from 'react-big-calendar';

interface CalendarToolbarProps {
  onView: (view: View) => void;
  label: string;
  view: View;
}

const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  onView,
  label,
  view,
}) => {
  return (
    <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-white">
      <h3 className="text-xl font-semibold text-gray-800">{label}</h3>
      <div className="flex gap-2 items-center">
        {['day', 'week', 'month'].map((viewType) => (
          <button
            key={viewType}
            className={`px-4 py-2 rounded-md ${view === viewType ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => onView(viewType as View)} // Cast string to View type
          >
            {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarToolbar;
