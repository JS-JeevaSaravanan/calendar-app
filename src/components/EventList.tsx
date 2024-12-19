import React, { useState } from 'react';
import { format } from 'date-fns';
import { IEvent } from '../store/useEventListStore';
import useEventListStore from '../store/useEventListStore';

const EventList: React.FC = () => {
  const events = useEventListStore((state) => state.events);
  const deleteEvent = useEventListStore((state) => state.deleteEvent);
  const updateEventStatus = useEventListStore(
    (state) => state.updateEventStatus,
  );

  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  const getFormattedStartTime = (event: IEvent) => {
    return event.start ? format(new Date(event.start), 'hh:mm a') : 'N/A';
  };

  const upcomingEvents = events
    .filter((event) => event.isActive)
    .filter((event) => new Date(event.start) > new Date())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  const handleCheckboxChange = (eventId: string) => {
    updateEventStatus(eventId);
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
  };

  const handleMouseEnter = (eventId: number) => setHoveredEvent(eventId);
  const handleMouseLeave = () => setHoveredEvent(null);

  return (
    <div className="bg-white rounded-lg">
      <section className="mb-4">
        <h2 className="text-base font-medium text-gray-700 mb-2 px-4">
          My Schedule
        </h2>
        <ul className="space-y-2 px-4 overflow-y-auto max-h-[300px]">
          {events.map((event, index) => (
            <li
              key={event.id}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 transition-colors"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <input
                type="checkbox"
                checked={event.isActive}
                onChange={() => handleCheckboxChange(event.id)}
                className="w-4 h-4 border-gray-300 rounded"
                style={{ accentColor: event.color }}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {event.title}
                </p>
              </div>
              {hoveredEvent === index && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <button
                    onClick={() => console.log('Edit event')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
              )}
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
              key={event.id}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
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
              {hoveredEvent === index && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <button
                    onClick={() => console.log('Edit event')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default EventList;
