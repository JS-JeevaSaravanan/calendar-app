import React, { useState } from 'react';
import { Event } from 'react-big-calendar';
import CalendarSection from './CalendarSection';
import Sidebar from '../components/Sidebar';

const initialEvents: Event[] = [
  {
    title: 'Event-1',
    start: new Date(2024, 1, 7, 7, 0),
    end: new Date(2024, 1, 7, 8, 0),
    color: '#FFFAE6',
  },
  {
    title: 'Event-2',
    start: new Date(2024, 1, 7, 7, 0),
    end: new Date(2024, 1, 7, 10, 0),
    color: '#E6F7FF',
  },
  {
    title: 'Event-3',
    start: new Date(2024, 1, 7, 11, 0),
    end: new Date(2024, 1, 7, 13, 0),
    color: '#E6FFE6',
  },
  {
    title: 'Event-4',
    start: new Date(2024, 1, 7, 11, 0),
    end: new Date(2024, 1, 7, 13, 0),
    color: '#E6FCFF',
  },
  {
    title: 'Event-5',
    start: new Date(2024, 1, 7, 14, 0),
    end: new Date(2024, 1, 7, 17, 0),
    color: '#FFFAE6',
  },
  {
    title: 'Event-6',
    start: new Date(2024, 1, 7, 14, 0),
    end: new Date(2024, 1, 7, 17, 0),
    color: '#FFE6E6',
  },
];

const CalendarPage: React.FC = () => {
  const [events] = useState<Event[]>(initialEvents);

  return (
    <div className="flex h-screen">
      <Sidebar events={events} />

      <CalendarSection events={events} />
    </div>
  );
};

export default CalendarPage;
