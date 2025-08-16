'use client';
import React from 'react';
import { Tab } from '@headlessui/react';

type TabItem = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  return (
    <Tab.Group>
      <div className=''>
        {/* Tab Headers */}
        <Tab.List className="flex justify-center gap-2 p-2 bg-slate-200 rounded-lg">
            {tabs?.map((tab, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  `flex-1 py-2 px-4 rounded-lg text-sm font-medium focus:outline-none max-w-52 
                 ${selected
                    ? 'bg-slate-500 text-white'
                    : 'bg-transparent text-black hover:bg-slate-300'
                  }`
                }
              >
                {tab?.label}
              </Tab>
            ))}
        </Tab.List>

        {/* Tab Panels */}
        <Tab.Panels className=" w-full p-2">
          {tabs?.map((tab, index) => (
            <Tab.Panel
              key={index}
              className="p-4 rounded-lg bg-slate-100 shadow-md"
            >
              {tab?.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </div>

    </Tab.Group>
  );
};

export default Tabs;
