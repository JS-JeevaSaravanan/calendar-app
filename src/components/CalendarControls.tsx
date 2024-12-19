import React from 'react';

const CalendarControls: React.FC = () => {
  return (
    <div className="space-x-2">
      <button className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
        Day
      </button>
      <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">
        Week
      </button>
      <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">
        Month
      </button>
      <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">
        Year
      </button>
    </div>
  );
};

export default CalendarControls;
