import React, { useEffect, useState } from 'react';
import { Text } from 'rizzui';
import Image from 'next/image';
import ShadowLefLightModeImage from '@public/images/lightMode-shadow-left.svg';
import ShadowLefImage from '@public/images/shadow-left.svg';
import { getAllProposalsDataApi } from '@/apis/dashbord/ecoSystem/governence';


const Listofproposals = () => {
    const [activeTab, setActiveTab] = useState('Active');
      const [allProposalsData, setAllProposalsData] = useState<any[]>([]);
    
        
        const fetchallProposalsData = async () => {
            try {
                const data = await getAllProposalsDataApi();
                setAllProposalsData(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };
        useEffect(() => {
            fetchallProposalsData();
        }, []);

   

    const filteredProposals = allProposalsData?.filter(proposal => proposal?.status === activeTab);

    return (
        <div className="relative text-white p-5 my-5 rounded-xl dark:bg-black-dark bg-lightgray-primary dark:border dark:border-greenPrimary-300 ">
            <div className='absolute top-0  left-0 '>
                <Image
                    src={ShadowLefImage}
                    alt="Shadow image"
                    className="hidden dark:block rounded-xl"
                />
                <Image
                    src={ShadowLefLightModeImage}
                    alt="Shadow image"
                    className="dark:hidden rounded-xl block"
                />
            </div>
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 mb-5">
                <div>
                    <Text className="text-base dark:text-white text-black-light font-bold py-2">
                        List of Proposals
                    </Text>
                </div>
                <div className="flex justify-end">
                <div className="flex items-center justify-end dark:border border-greenPrimary-300 dark:rounded-lg overflow-hidden text-black-dark font-medium">
                    <button
                        className={`w-auto px-4 xs:px-6 py-2 font-medium ${activeTab === 'Active'
                            ? 'bg-yellow-primary'
                            : 'dark:bg-transparent bg-white dark:text-white'
                            } rounded-tl-lg rounded-bl-lg sm:rounded-tr-none`}
                        onClick={() => setActiveTab('Active')}
                    >
                        Active
                    </button>

                    <button
                        className={`w-auto px-4 xs:px-6 py-2 font-medium ${activeTab === 'Closed'
                            ? 'bg-yellow-primary'
                            : 'dark:bg-transparent bg-white dark:text-white'
                            } rounded-b-lg rounded-tr-lg sm:rounded-br-lg rounded-bl-none`}
                        onClick={() => setActiveTab('Closed')}
                    >
                        Closed
                    </button>
                </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProposals?.map((proposal) => (
                    <div
                        key={proposal.id}
                        className="relative w-full rounded-lg p-4 dark:bg-greenPrimary-200 bg-white overflow-hidden"
                    >
                        <Image
                            src={ShadowLefImage}
                            alt="Shadow image"
                            className=" absolute -top-10 -left-10 hidden dark:block"
                        />
                        <Image
                            src={ShadowLefLightModeImage}
                            alt="Shadow image"
                            className=" absolute -top-10 -left-10 dark:hidden block"
                        />
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/mokey.svg"
                                    alt="Avatar"
                                    width={30}
                                    height={30}
                                    className="rounded-lg"
                                />
                                <Text className="text-sm font-semibold text-greenPrimary-100">Money$Mutt</Text>
                            </div>
                            <Text className="text-sm text-greenPrimary-500 font-normal">{proposal?.daysLeft}</Text>
                        </div>

                        <Text className="text-base font-medium dark:text-white text-black-dark my-2">{proposal?.title}</Text>
                        <Text className="text-sm font-normal my-3 dark:text-white text-black-dark">{proposal?.description}</Text>
                        <div className="flex justify-between items-center">
                            <Text className="text-xs font-medium text-gray-1200">{proposal?.votes} Votes</Text>
                            <button
                                className={`py-2 px-3 rounded-md font-medium text-sm ${activeTab === 'Active' ? 'bg-yellow-primary dark:text-black-dark' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                                disabled={activeTab !== 'Active'}
                            >
                                Vote Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Listofproposals;