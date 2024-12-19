import React from 'react';
import EventList from './EventList';
import { BsHouse, BsBook } from 'react-icons/bs';

const Sidebar: React.FC = () => {
  const navItems = [
    { icon: <BsHouse />, label: 'Home' },
    {
      icon: <BsBook />,
      label: 'Academi',
      subItems: ['Academi Calendar', 'My Calendar'],
    },
  ];

  return (
    <aside className="w-64 bg-white p-4 border-r border-gray-200 shadow-md h-screen flex flex-col">
      {' '}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-800 mb-4">Academi</h1>
        <nav>
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                  {item.icon && (
                    <span className="text-lg text-gray-600">{item.icon}</span>
                  )}
                  <p className="text-gray-700 font-medium">{item.label}</p>
                </div>
                {item.subItems && (
                  <ul className="pl-8 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className={`p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer ${
                          subItem === 'Academi Calendar' ? 'bg-gray-100' : ''
                        }`}
                      >
                        <p
                          className={`text-sm font-medium ${
                            subItem === 'Academi Calendar'
                              ? 'text-blue-500'
                              : 'text-gray-700'
                          }`}
                        >
                          {subItem}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex-1 overflow-y-auto pt-4">
        <EventList />
      </div>
    </aside>
  );
};

export default Sidebar;
