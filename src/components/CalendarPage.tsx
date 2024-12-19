import React from 'react';
import CalendarSection from './CalendarSection.tsx';
import Sidebar from '../components/Sidebar';

const CalendarPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <CalendarSection />
    </div>
  );
};

export default CalendarPage;
