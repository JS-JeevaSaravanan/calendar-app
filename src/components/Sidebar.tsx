import React from 'react';
import { BsHouse } from 'react-icons/bs';
import FilterEventList from './FilterEventList';
import UpcomingEventList from './UpcomingEventList';
import useEventListStore from '../store/useEventListStore';
import AcademiNav from './AcademiNav';

const Sidebar: React.FC = () => {
  const events = useEventListStore((state) => state.events);
  const deleteEvent = useEventListStore((state) => state.deleteEvent);
  const updateEventStatus = useEventListStore(
    (state) => state.updateEventStatus,
  );

  const navItems = [
    { icon: <BsHouse />, label: 'Home' },
    { label: 'Academi', subItems: ['Academi Calendar', 'My Calendar'] },
  ];

  return (
    <aside
      className="top-0 left-0 h-screen bg-white p-4 border-r border-gray-200 shadow-md flex flex-col"
      style={{ width: '260px' }}
    >
      <div className="mb-6">
        <nav>
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.label === 'Academi' && item.subItems ? (
                  <AcademiNav subItems={item.subItems} />
                ) : (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                    <span className="text-lg text-gray-600">{item.icon}</span>
                    <p className="text-gray-800 font-medium">{item.label}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex-1 pt-4 overflow-y-auto">
        <FilterEventList
          events={events}
          updateEventStatus={updateEventStatus}
          deleteEvent={deleteEvent}
        />
        <UpcomingEventList events={events} />
      </div>
    </aside>
  );
};

export default Sidebar;
