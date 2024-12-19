import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, SlotInfo } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { enUS } from 'date-fns/locale';
import useEventListStore, { IEvent } from '../store/useEventListStore';
import EventCreator from './EventCreator';

const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarSection: React.FC = () => {
  const events = useEventListStore((state) => state.events);
  const addEvent = useEventListStore((state) => state.addEvent);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<SlotInfo | null>(null);

  const eventStyleGetter = (event: IEvent) => ({
    style: {
      backgroundColor: event.color,
      borderRadius: '8px',
      opacity: 0.9,
      color: 'black',
      border: '0px',
      display: 'block',
    },
  });

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedTime(slotInfo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTime(null);
  };

  const handleCreateEvent = (newEvent: IEvent) => {
    addEvent(newEvent); // Add the mapped event to the store
    setIsModalOpen(false); // Close the modal
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
          selectable
          onSelectSlot={handleSelectSlot}
        />
      </div>

      {isModalOpen && selectedTime && (
        <EventCreator
          onClose={handleCloseModal}
          open={isModalOpen}
          onCreate={handleCreateEvent}
          selectedTime={selectedTime}
        />
      )}
    </div>
  );
};

export default CalendarSection;
