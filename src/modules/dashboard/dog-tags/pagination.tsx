import React, { useState } from "react";
import clsx from "clsx";

export interface PaginationProps {
    onChange?: (page: number | string) => void;
    className?: string;
    mode?: "light" | "dark";
    totalPages?: number;
}

export default function Pagination({
    onChange,
    className,
    mode = "light",
    totalPages = 1,
}: PaginationProps) {
    const [activePage, setActivePage] = useState<number | string>("All");

    const handlePageClick = (page: number | string) => {
        if (typeof page === "number" && page > totalPages) return;
        setActivePage(page);
        if (onChange) onChange(page);
    };

    return (
        <div className={clsx("dark:border border-greenPrimary-300 rounded-lg", className)}>
            <div
                className={clsx(
                    "flex items-center flex-wrap",
                    mode === "dark" && "border border-gray-600 rounded-lg p-2"
                )}
            >
                <button
                    onClick={() => handlePageClick("All")}
                    className={clsx(
                        "px-1.5 sm:px-3 py-1 sm:py-2 rounded-tl-md rounded-bl-md font-roboto text-xs font-medium dark:border-r border-greenPrimary-300",
                        mode === "light"
                            ? activePage === "All"
                                ? "bg-yellow-400 text-greenPrimary-secodarydark"
                                : "bg-white dark:bg-slate-950 dark:text-white text-slate-950"
                            : activePage === "All"
                    )}
                >
                    All
                </button>

                {[...Array(10)].map((_, i) => {
                    const page = i + 1;
                    const isDisabled = page > totalPages;

                    return (
                        <button
                            key={page}
                            onClick={() => !isDisabled && handlePageClick(page)}
                            disabled={isDisabled}
                            className={clsx(
                                "px-2 sm:px-3 py-1 sm:py-2 font-roboto text-xs sm:text-xs font-medium dark:border-r border-greenPrimary-300",
                                page === 10 && "rounded-tr-md rounded-br-md border-r-0",
                                isDisabled && "cursor-not-allowed opacity-50",
                                mode === "light"
                                    ? activePage === page
                                        ? "bg-yellow-400 text-greenPrimary-secodarydark !font-bold"
                                        : "bg-white dark:bg-slate-950 dark:text-white text-slate-950"
                                    : activePage === page
                            )}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

Pagination.displayName = "Pagination";
