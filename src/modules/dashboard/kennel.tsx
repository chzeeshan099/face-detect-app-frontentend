"use client";

import React, { useState } from 'react';
import { Text, Button } from 'rizzui';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Kennel = () => {
    const [activeTab, setActiveTab] = useState("Buy");
    const [currentPage, setCurrentPage] = useState(1);

    const transactions = [
        { amount: "1.689K $MUTT", status: "Pending", value: "-$500.06", date: "12.05.2024 14:30" },
        { amount: "1.689K $MUTT", status: "Success", value: "-$500.06", date: "12.05.2024 14:30" },
        { amount: "1.689K $MUTT", status: "Failed", value: "-$500.06", date: "12.05.2024 14:30" },
        { amount: "1.689K $MUTT", status: "Pending", value: "-$500.06", date: "12.05.2024 14:30" },
        { amount: "1.689K $MUTT", status: "Success", value: "-$500.06", date: "12.05.2024 14:30" },
        { amount: "1.689K $MUTT", status: "Failed", value: "-$500.06", date: "12.05.2024 14:30" },
        { amount: "1.689K $MUTT", status: "Pending", value: "-$500.06", date: "12.05.2024 14:30" },
        { amount: "1.689K $MUTT", status: "Success", value: "-$500.06", date: "12.05.2024 14:30" },
        { amount: "1.689K $MUTT", status: "Failed", value: "-$500.06", date: "12.05.2024 14:30" },
        { amount: "1.689K $MUTT", status: "Pending", value: "-$500.06", date: "12.05.2024 14:30" },
        { amount: "1.689K $MUTT", status: "Success", value: "-$500.06", date: "12.05.2024 14:30" },
        { amount: "1.689K $MUTT", status: "Failed", value: "-$500.06", date: "12.05.2024 14:30" },
    ];

    const filteredTransactions = transactions.filter((_, index) => {
        const start = (currentPage - 1) * 10;
        const end = start + 10;
        return index >= start && index < end;
    });

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const handlePageChange = (direction: string) => {
        if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (direction === "next" && currentPage < Math.ceil(transactions.length / 10)) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <div className="bg-lightgray-primary dark:bg-green-secodarydark border-white dark:border-gray-200 w-full shadow-lg rounded-lg border mx-auto mt-4">
                <Text className="text-base p-3 text-center border-b border-white dark:border-gray-200 font-bold text-gray-800 dark:text-white">
                    My Transactions
                </Text>
            </div>
            <div className="bg-lightgray-primary dark:bg-green-secodarydark border-white dark:border-gray-200 p-6 min-h-screen">
                <div className="flex justify-end mb-3 rounded-md">
                    <div className="flex flex-col sm:flex-row dark:border dark:rounded-lg overflow-hidden">
                        <button
                            className={`w-full sm:w-auto px-4 sm:px-6 py-2 font-medium text-xs dark:border-r ${activeTab === 'Buy'
                                ? 'bg-[#FFC000] text-[#01121A]'
                                : 'dark:bg-transparent bg-white dark:text-white text-[#01121A]'
                                } rounded-t-lg sm:rounded-tl-lg sm:rounded-bl-lg sm:rounded-tr-none`}
                            onClick={() => handleTabChange('Buy')}
                        >
                            Buy
                        </button>

                        <button
                            className={`w-full sm:w-auto px-4 sm:px-6 py-2 font-medium dark:border-r ${activeTab === 'Claim'
                                ? 'bg-[#FFC000] text-[#01121A]'
                                : 'dark:bg-transparent bg-white dark:text-white text-[#01121A]'
                                }`}
                            onClick={() => handleTabChange('Claim')}
                        >
                            Claim
                        </button>

                        <button
                            className={`w-full sm:w-auto px-4 sm:px-6 py-2 font-medium dark:border-r ${activeTab === 'Reward'
                                ? 'bg-[#FFC000] text-[#01121A]'
                                : 'dark:bg-transparent bg-white dark:text-white text-[#01121A]'
                                }`}
                            onClick={() => handleTabChange('Reward')}
                        >
                            Reward
                        </button>

                        <button
                            className={`w-full sm:w-auto px-4 sm:px-6 py-2 font-medium ${activeTab === 'Referral'
                                ? 'bg-[#FFC000] text-[#01121A]'
                                : 'dark:bg-transparent bg-white dark:text-white text-[#01121A]'
                                } rounded-b-lg sm:rounded-tr-lg sm:rounded-br-lg sm:rounded-bl-none`}
                            onClick={() => handleTabChange('Referral')}
                        >
                            Referral
                        </button>
                    </div>
                </div>
                <div>
                    {filteredTransactions.map((transaction, index) => (
                        <div
                            key={index}
                            className="flex flex-wrap justify-between items-center py-3 "
                        >
                            <div className="w-full sm:w-auto">
                                <Text className="text-base font-bold dark:text-white">{transaction.amount}</Text>
                                <Text
                                    className={`text-sm font-medium flex ${transaction.status === "Success"
                                        ? "text-green-500"
                                        : transaction.status === "Pending"
                                            ? "text-yellow-500"
                                            : "text-red-500"
                                        }`}
                                >
                                    <Text className="text-[#20655D] text-sm font-medium">Status:</Text> &nbsp;
                                    {transaction.status}
                                </Text>
                            </div>
                            <div className="text-right w-full sm:w-auto mt-2 sm:mt-0">
                                <Text className="m-0 text-base font-bold dark:text-white">{transaction.value}</Text>
                                <Text className="text-sm font-normal text-[#20655D]">{transaction.date}</Text>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-6">
                    <div
                        className={`w-8 h-8 flex items-center justify-center rounded-md dark:bg-[#092522] bg-white cursor-pointer ${currentPage > 1 ? "dark:text-white text-black" : "text-gray-500 pointer-events-none"
                            }`}
                        onClick={() => handlePageChange("prev")}
                    >
                        <FaArrowLeft className="text-sm" />
                    </div>
                    <Text className="text-sm font-medium">
                        {currentPage}/{Math.ceil(transactions.length / 10)}
                    </Text>
                    <div
                        className={`w-8 h-8 flex items-center justify-center rounded-md dark:bg-[#092522] bg-white cursor-pointer ${currentPage < Math.ceil(transactions.length / 10) ? "dark:text-white text-black" : "text-gray-500 pointer-events-none"
                            }`}
                        onClick={() => handlePageChange("next")}
                    >
                        <FaArrowRight className="text-sm" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Kennel;