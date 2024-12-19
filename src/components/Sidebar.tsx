import React from 'react';
import EventList from './EventList';

interface SidebarProps {
  events: Event[];
}

const Sidebar: React.FC<SidebarProps> = ({ events }) => {
  return (
    <div className="w-1/4 bg-gray-100 p-6 border-r border-gray-300">
      <EventList events={events} />
    </div>
  );
};

export default Sidebar;
