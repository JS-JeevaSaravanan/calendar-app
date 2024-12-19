import React from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { enUS } from 'date-fns/locale';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarSectionProps {
  events: Event[];
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ events }) => {
  const eventStyleGetter = (event: Event) => {
    const style = {
      backgroundColor: event.color,
      borderRadius: '8px',
      opacity: 0.9,
      color: 'black',
      border: '0px',
      display: 'block',
    };
    return { style };
  };

  return (
    <div className="w-3/4 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
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
      </div>

      <div className="rounded-lg border border-gray-200 shadow-sm">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="day"
          views={['day', 'week', 'month']}
          style={{ height: '70vh' }}
          eventPropGetter={eventStyleGetter}
          className="p-4"
        />
      </div>
    </div>
  );
};

export default CalendarSection;
