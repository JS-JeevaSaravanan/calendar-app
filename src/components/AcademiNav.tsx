import React, { useState } from 'react';

interface AcademiNavProps {
  subItems: string[];
}

const AcademiNav: React.FC<AcademiNavProps> = ({ subItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => setIsOpen(!isOpen);

  return (
    <div className="w-full">
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
        onClick={toggleCollapse}
      >
        <span className="text-lg text-gray-600">📚</span>
        <p className="text-gray-800 font-medium flex-1">Academi</p>
        <span
          className={`text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-90' : ''
          }`}
        >
          ▶
        </span>
      </div>

      {/* Sub-items */}
      <ul
        className={`pl-6 border-l-2 border-gray-200 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        {subItems.map((subItem, index) => (
          <li
            key={index}
            className={`py-2 px-3 rounded-md transition-colors cursor-pointer ${
              subItem === 'Academi Calendar'
                ? 'bg-blue-50 text-blue-500 font-medium'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <p className="text-sm">{subItem}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcademiNav;
