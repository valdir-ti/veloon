import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { TPagination } from '../types/pagination'

function Pagination({ currentPage, setPage, totalPages }: TPagination) {
    const pagesToShow = 5

    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2))
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1)
    const visiblePages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    )

    return <div className='flex justify-center items-center mt-5 space-x-2 fixed top-[65%]'>
        <button
            className={`btn-primary w-8 h-8 flex justify-center items-center rounded-full border ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white hover:bg-blue-100 text-gray-700'}`}
            onClick={() => currentPage > 1 && setPage(currentPage - 1)}
        >
            <FaChevronLeft />
        </button>
        {startPage > 1 && (
            <>
                <button
                    className={`btn-primary w-8 h-8 flex justify-center items-center rounded-full border bg-white hover:bg-blue-100 text-gray-700`}
                    onClick={() => setPage(1)}
                >
                    1
                </button>
                {startPage > 2 && (
                    <span className='w-8 h-8 flex justify-center items-center text-gray-500'>...</span>
                )}
            </>
        )}
        {visiblePages.map((page, idx) => (
            <button
                key={idx}
                className={`btn-primary w-8 h-8 flex justify-center items-center rounded-full border ${currentPage === page ? 'bg-gradient-to-r from-blue-300 to-purple-500 text-white font-bold' : 'bg-white hover:bg-blue-100 text-gray-700'}`}
                onClick={() => setPage(page)}
            >
                {page}
            </button>
        ))}
        {endPage < totalPages && (
            <>
                {endPage < totalPages - 1 && (
                    <span className='w-8 h-8 flex justify-center items-center text-gray-500'>...</span>
                )}
                <button
                    className={`btn-primary w-8 h-8 flex justify-center items-center rounded-full border ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white hover:bg-blue-100 text-gray-700'}`}
                    onClick={() => setPage(totalPages)}
                >
                    {totalPages}
                </button>
            </>
        )}
        <button
            className={`btn-primary flex w-8 h-8 justify-center items-center rounded-full border ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white hover:bg-blue-100 text-gray-700'}`}
            onClick={() => currentPage < totalPages && setPage(currentPage + 1)}
        >
            <FaChevronRight />
        </button>
    </div>
}

export default Pagination
