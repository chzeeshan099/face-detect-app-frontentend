"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Pagination from "./pagination";
import { Progressbar } from "rizzui";
import { Text } from "rizzui";
import clsx from "clsx";
import { getDogTagsDataApi } from "@/apis/dashbord/dogTags";

const DogtagsCard = () => {
    const [dogTagsData, setDogTagsData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number | string>("All");

    const itemsPerPage = 12;

    const fetchDogTagsData = async () => {
        try {
            const data = await getDogTagsDataApi();
            setDogTagsData(data);
        } catch (error) {
            console.error("Error fetching dog tags:", error);
        }
    };

    useEffect(() => {
        fetchDogTagsData();
    }, []);

    const totalPages = Math.ceil(dogTagsData.length / itemsPerPage);

    const paginatedData =
        currentPage === "All"
            ? dogTagsData
            : dogTagsData.slice(
                  ((currentPage as number) - 1) * itemsPerPage,
                  (currentPage as number) * itemsPerPage
              );

    return (
        <div className="sm:px-2 py-2">
            <div>
                <div className="flex md:flex-row flex-col gap-4 justify-between items-center mb-4">
                    <Text className="text-2xl font-semibold text-black-light dark:text-white">
                        Dog Tags
                    </Text>
                    <Pagination
                        onChange={setCurrentPage}
                        totalPages={totalPages}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {paginatedData.map((tag, index) => (
                        <div
                            key={index}
                            className={clsx(
                                "p-5 rounded-lg flex flex-col items-center justify-between font-roboto text-black-light dark:text-white",
                                tag?.lightmodeColor === "#F6F9FE" &&
                                    "bg-[#F6F9FE] dark:bg-[#141924]",
                                tag?.lightmodeColor === "#FEFCF6" &&
                                    "bg-[#FEFCF6] dark:bg-[#1E1D1A]",
                                tag?.lightmodeColor === "#141B24" &&
                                    "bg-[#141B24] dark:bg-[#1E181A]",
                                tag?.borderColor === "#0B152A" &&
                                    "dark:border dark:border-[#0B152A]",
                                tag?.borderColor === "#2A220B" &&
                                    "dark:border dark:border-[#2A220B]",
                                tag?.borderColor === "#0B182A" &&
                                    "dark:border dark:border-[#0B182A]",
                                tag?.borderColor === "#2A0B15" &&
                                    "dark:border dark:border-[#2A0B15]"
                            )}
                        >
                            <div className="flex flex-col items-center text-center mb-3">
                                <div className="mb-4">
                                    <Image
                                        src={tag?.icon}
                                        alt={`Rank ${tag?.rank}`}
                                        width={60}
                                        height={60}
                                    />
                                </div>
                                <Text className="text-2xl font-semibold">
                                    Rank {tag?.rank}
                                </Text>
                                <Text className="text-sm font-medium mt-2">
                                    {tag?.title}
                                </Text>
                            </div>
                            <Progressbar
                                value={tag?.progressValue}
                                color="warning"
                                className="w-full my-4"
                            />
                            <Text className="text-sm font-medium">
                                {tag?.progress}
                            </Text>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DogtagsCard;
