import React from 'react';

interface ContractTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const ContractTabs: React.FC<ContractTabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="w-full">
            <div className="sr-only">
                <input
                    type="radio"
                    id="read-tab"
                    name="tab"
                    checked={activeTab === 'read'}
                    onChange={() => onTabChange('read')}
                />
                <input
                    type="radio"
                    id="write-tab"
                    name="tab"
                    checked={activeTab === 'write'}
                    onChange={() => onTabChange('write')}
                />
            </div>

            <div className="grid grid-cols-2 overflow-hidden border-b">
                <label
                    htmlFor="read-tab"
                    className={`block text-center py-3 px-1 sm:px-4 text-xs sm:text-sm md:text-base font-medium transition-colors z-30 cursor-pointer
                    ${activeTab === 'read'
                            ? 'dark:bg-gradient-light bg-gradient-dark dark:text-gray-950 text-white'
                            : 'bg-gray-100 dark:bg-greenPrimary-secodarydark text-gray-700 dark:text-white'}`}
                    onClick={() => onTabChange('read')}
                >
                    Read Function
                </label>
                <label
                    htmlFor="write-tab"
                    className={`block text-center py-3 px-1 sm:px-4 text-xs sm:text-sm md:text-base font-medium transition-colors z-30 cursor-pointer ${activeTab === 'write'
                        ? 'dark:bg-gradient-light bg-gradient-dark dark:text-gray-950 text-white'
                        : 'bg-gray-100 dark:bg-greenPrimary-secodarydark text-gray-700 dark:text-white'
                        }`}
                    onClick={() => onTabChange('write')}
                >
                    Write Function
                </label>
            </div>
        </div>
    );
};

export default ContractTabs;
