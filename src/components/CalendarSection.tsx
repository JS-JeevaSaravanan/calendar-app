import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, SlotInfo } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { enUS } from 'date-fns/locale';
import useEventListStore, { IEvent } from '../store/useEventListStore';
import EventCreator from './EventCreator';
import CalendarToolbar from './CalendarToolbar';

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
      updateEvent(event.id, event);
    } else {
      const newEvent = {
        ...event,
        start: selectedTime?.start || new Date(),
        end: selectedTime?.end || new Date(),
      };
      addEvent(newEvent);
    }
    setIsModalOpen(false);
  };

  const activeEvents = events.filter((event) => event.isActive);

  return (
    <main className="w-full p-6 bg-gray-50">
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
            toolbar: (props) => <CalendarToolbar {...props} />, // Updated to sync toolbar design
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
