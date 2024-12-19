// CalendarSection Component
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, SlotInfo, View } from 'react-big-calendar';
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

const CustomToolbar: React.FC<any> = ({ onView, label, view }) => {
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

const CalendarSection: React.FC = () => {
  const events = useEventListStore((state) => state.events);
  const addEvent = useEventListStore((state) => state.addEvent);
  const updateEvent = useEventListStore((state) => state.updateEvent);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<SlotInfo | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  const eventStyleGetter = (event: IEvent) => ({
    style: {
      backgroundColor: event.color,
      borderRadius: '8px',
      opacity: 0.9,
      color: 'white',
      border: '0px',
      display: 'block',
      padding: '4px',
    },
  });

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedTime(slotInfo);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleSelectEvent = (event: IEvent) => {
    setSelectedEvent(event);
    setSelectedTime(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTime(null);
    setSelectedEvent(null);
  };

  const handleSaveEvent = (event: IEvent) => {
    if (selectedEvent) {
      updateEvent(event.id, event); // Update existing event
    } else {
      addEvent(event); // Create new event
    }
    setIsModalOpen(false);
  };

  const activeEvents = events.filter((event) => event.isActive);

  return (
    <main className="w-3/4 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
      </div>

      <div className="rounded-lg border border-gray-200 shadow-md bg-white">
        <Calendar
          localizer={localizer}
          events={activeEvents}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={['day', 'week', 'month']}
          style={{ height: '70vh' }}
          eventPropGetter={eventStyleGetter}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          components={{
            toolbar: (props) => <CustomToolbar {...props} />,
          }}
        />
      </div>

      {isModalOpen && (
        <EventCreator
          onClose={handleCloseModal}
          open={isModalOpen}
          onSave={handleSaveEvent}
          selectedTime={selectedTime}
          selectedEvent={selectedEvent}
        />
      )}
    </main>
  );
};

export default CalendarSection;
