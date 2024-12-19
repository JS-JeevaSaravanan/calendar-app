import React from 'react';
import { format } from 'date-fns';
import { IEvent } from '../store/useEventListStore';

interface EventListProps {
  events: IEvent[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const getFormattedStartTime = (event: IEvent) => {
    return event.start ? format(event.start, 'hh:mm a') : 'N/A';
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">My Schedule</h2>
      <ul>
        {events.map((event, index) => (
          <li
            key={index}
            className="flex items-center gap-2 mb-3 text-gray-700 text-sm font-medium"
          >
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: event.color }}
            ></span>
            {event.title}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-4 text-gray-800">
        Upcoming Events
      </h2>
      <ul>
        {events.slice(0, 4).map((event, index) => (
          <li key={index} className="text-gray-700 mb-2 text-sm">
            {event.title}{' '}
            <span className="text-gray-500">
              - {getFormattedStartTime(event)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
