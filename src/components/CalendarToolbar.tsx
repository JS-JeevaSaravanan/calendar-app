import React, { useEffect, useState } from 'react';
import {
  format,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  isSameWeek,
  isSameMonth,
  isSameDay,
  parse,
} from 'date-fns';

const parseDate = (dateString: string): Date => {
  const parsedDate = parse(dateString, 'MMMM d, yyyy', new Date());
  return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
};

const CalendarToolbar: React.FC<any> = ({
  onNavigate,
  onView,
  label,
  view,
}) => {
  const [currentLabel, setCurrentLabel] = useState<Date>(parseDate(label));

  useEffect(() => {
    setCurrentLabel(parseDate(label));
  }, [label]);

  const getRelativeDateLabel = () => {
    const today = new Date();

    switch (view) {
      case 'day': {
        if (isSameDay(currentLabel, today)) return 'Today';
        if (isSameDay(currentLabel, subDays(today, 1))) return 'Yesterday';
        if (isSameDay(currentLabel, addDays(today, 1))) return 'Tomorrow';
        return format(currentLabel, 'ddMMMMyyyy');
      }
      case 'week': {
        const start = startOfWeek(currentLabel);
        const end = endOfWeek(currentLabel);
        if (isSameWeek(currentLabel, today)) return 'This Week';
        return `${format(start, 'ddMMMMyyyy')} to ${format(end, 'ddMMMMyyyy')}`;
      }
      case 'month': {
        if (isSameMonth(currentLabel, today)) return 'This Month';
        return format(currentLabel, 'MMM yyyy');
      }
      default:
        return format(currentLabel, 'MMMM d, yyyy');
    }
  };

  const handleNavigate = (direction: 'PREV' | 'NEXT') => {
    let newDate: Date;

    switch (view) {
      case 'day':
        newDate =
          direction === 'PREV'
            ? subDays(currentLabel, 1)
            : addDays(currentLabel, 1);
        break;
      case 'week':
        newDate =
          direction === 'PREV'
            ? subDays(currentLabel, 7)
            : addDays(currentLabel, 7);
        break;
      case 'month':
        newDate =
          direction === 'PREV'
            ? subDays(currentLabel, 30)
            : addDays(currentLabel, 30);
        break;
      default:
        newDate = currentLabel;
    }

    setCurrentLabel(newDate);
    onNavigate(format(newDate, 'MMMM d, yyyy'));
  };

  return (
    <div className="flex justify-between items-center py-2 px-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-1">
        <button
          className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
          onClick={() => handleNavigate('PREV')}
        >
          &#x276E;
        </button>
        <span className="text-sm font-medium text-gray-700">
          {view === 'week' || view === 'month'
            ? `${format(startOfWeek(currentLabel), 'dd-MM-yyyy')} - ${format(endOfWeek(currentLabel), 'dd-MM-yyyy')}`
            : format(currentLabel, 'dd-MM-yyyy')}
        </span>
        <button
          className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
          onClick={() => handleNavigate('NEXT')}
        >
          &#x276F;
        </button>
      </div>

      <div className="flex items-center gap-1">
        {['day', 'week', 'month'].map((viewType) => (
          <button
            key={viewType}
            className={`px-3 py-1 text-sm font-medium rounded ${
              view === viewType
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => onView(viewType as typeof view)}
          >
            {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
          </button>
        ))}
      </div>

      <div className="text-sm font-bold text-gray-700">
        {getRelativeDateLabel()}
      </div>
    </div>
  );
};

export default CalendarToolbar;
