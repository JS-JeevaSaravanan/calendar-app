import React from 'react';
import CalendarSection from './CalendarSection.tsx';
import Sidebar from '../components/Sidebar';

const CalendarPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <CalendarSection />
    </div>
  );
};

export default CalendarPage;
