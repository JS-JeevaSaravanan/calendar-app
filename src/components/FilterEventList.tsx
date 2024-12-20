import React, { useState } from 'react';
import { IEvent } from '../store/useEventListStore';
import { FaTrash, FaEdit } from 'react-icons/fa'; // Using react-icons for cleaner UI
import EventCreator from './EventCreator'; // Import EventCreator component

interface FilterEventListProps {
  events: IEvent[];
  updateEventStatus: (eventId: string) => void;
  deleteEvent: (eventId: string) => void;
}

const FilterEventList: React.FC<FilterEventListProps> = ({
  events,
  updateEventStatus,
  deleteEvent,
}) => {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  const handleCheckboxChange = (eventId: string) => {
    updateEventStatus(eventId);
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
  };

  const handleMouseEnter = (eventId: number) => setHoveredEvent(eventId);
  const handleMouseLeave = () => setHoveredEvent(null);

  const handleEditEvent = (event: IEvent) => {
    setSelectedEvent(event); // Set the selected event
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedEvent(null); // Reset selected event
  };

  return (
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
              <p className="text-sm font-medium text-gray-800">{event.title}</p>
            </div>
            {hoveredEvent === index && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Delete Event"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => handleEditEvent(event)} // Trigger edit on button click
                  className="text-blue-600 hover:text-blue-800 p-1"
                  title="Edit Event"
                >
                  <FaEdit />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {isModalOpen && selectedEvent && (
        <EventCreator
          onClose={handleCloseModal}
          open={isModalOpen}
          onSave={(updatedEvent) => {
            console.log('Event saved:', updatedEvent);
            handleCloseModal();
          }}
          selectedTime={null}
          selectedEvent={selectedEvent}
        />
      )}
    </section>
  );
};

export default FilterEventList;
