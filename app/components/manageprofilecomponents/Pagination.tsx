"use client";
import React, { useState } from 'react';

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const goToNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <nav className="flex justify-center mt-4" aria-label="Pagination">
            <ul className="flex">
                {/* Leftwards Arrow */}
                <li>
                    <button onClick={goToPreviousPage} disabled={currentPage === 1} className="relative block py-2 px-3 h-[2.33rem] leading-tight bg-white border border-gray-300 text-black mr-1 hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </li>
                {/* Pagination Links */}
                <li>
                    <a href="#" className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-black mr-1 hover:bg-gray-200">{currentPage}</a>
                </li>
                {/* Rightwards Arrow */}
                <li>
                    <button onClick={goToNextPage} className="relative block py-2 px-3 h-[2.33rem] leading-tight bg-white border border-gray-300 text-black mr-1 hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
