import React from 'react';
import { format } from 'date-fns';
import { IEvent } from '../store/useEventListStore';
import useEventListStore from '../store/useEventListStore';

const EventList: React.FC = () => {
  const events = useEventListStore((state) => state.events);

  const getFormattedStartTime = (event: IEvent) => {
    return event.start ? format(new Date(event.start), 'hh:mm a') : 'N/A';
  };

  const upcomingEvents = events.filter((event) => {
    const eventStart = new Date(event.start);
    return eventStart > new Date();
  });

  return (
    <div className="bg-white rounded-lg">
      <section className="mb-4">
        <h2 className="text-base font-medium text-gray-700 mb-2 px-4">
          My Schedule
        </h2>
        <ul className="space-y-2 px-4 overflow-y-auto max-h-[300px]">
          {events.map((event, index) => (
            <li
              key={index}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: event.color }}
              ></span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {event.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-base font-medium text-gray-700 mb-2 px-4">
          Upcoming Events
        </h2>
        <ul className="space-y-2 px-4 overflow-y-auto max-h-[300px]">
          {upcomingEvents.map((event, index) => (
            <li
              key={index}
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
                <p className="text-sm font-medium text-gray-800">
                  {event.title}
                </p>
                <p className="text-xs text-gray-500">
                  {getFormattedStartTime(event)} •{' '}
                  {event.description || 'No description'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default EventList;
