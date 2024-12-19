import React from 'react';
import useEventListStore from '../store/useEventListStore'; // Import your Zustand store
import EventList from './EventList';

const Sidebar: React.FC = () => {
  const events = useEventListStore((state) => state.events);

  return (
    <div className="w-1/4 bg-gray-100 p-6 border-r border-gray-300">
      <EventList events={events} />
    </div>
  );
};

export default Sidebar;
