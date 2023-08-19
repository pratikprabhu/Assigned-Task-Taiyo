import React, { useState } from 'react';
import Contacts from './Contacts';
import Charts from './Charts';
import Maps from './Maps';
import Dashboard from './Dashboard';

interface Tab {
  label: string;
  component: React.ReactNode;
}

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs: Tab[] = [
    {
      label: 'Contacts',
      component: <Contacts />,
    },
    {
      label: 'Dashboard',
      component: <Dashboard />,
    },
    {
      label: 'Chart',
      component: <Charts />,
    },
    {
      label: 'Maps',
      component: <Maps />
    },
  ];

  return (
    <div className="flex h-screen">
    <div className="w-52 bg-gray-100"> {/* Use overflow-y-auto to allow scrolling in sidebar */}
        <div className="flex flex-col h-full p-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`p-2 mb-2 rounded ${
                activeTab === index ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-4/5 bg-white p-4 overflow-y-hidden"> {/* Use overflow-y-hidden to keep map fixed */}
        {tabs[activeTab].component}
      </div>
    </div>
  );
};

export default Sidebar;
