import React from 'react';
import { IEvent } from '../store/useEventListStore';
import { format } from 'date-fns';

interface UpcomingEventListProps {
  events: IEvent[];
}

const UpcomingEventList: React.FC<UpcomingEventListProps> = ({ events }) => {
  const upcomingEvents = events
    .filter((event) => new Date(event.start) > new Date())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  const getFormattedStartTime = (event: IEvent) => {
    return event.start ? format(new Date(event.start), 'hh:mm a') : 'N/A';
  };

  return (
    <section>
      <h2 className="text-base font-medium text-gray-700 mb-2 px-4">
        Upcoming Events
      </h2>
      <ul className="space-y-2 px-4 overflow-y-auto max-h-[300px]">
        {upcomingEvents.map((event) => (
          <li
            key={event.id}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            {event.image && (
              <img
                src={event.image}
                alt="Event"
                className="w-10 h-10 rounded-md object-cover"
              />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{event.title}</p>
              <p className="text-xs text-gray-500">
                {getFormattedStartTime(event)} •{' '}
                {event.description || 'No description'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-red-600 hover:text-red-800">
                <i className="fas fa-trash"></i>
              </button>
              <button
                onClick={() => console.log('Edit event')}
                className="text-blue-600 hover:text-blue-800"
              >
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UpcomingEventList;
