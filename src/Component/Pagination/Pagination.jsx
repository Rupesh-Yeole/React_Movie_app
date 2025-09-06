function Pagination({ PageNumber, updatePageNumber }) {
  const handlePrev = () => {
    if (PageNumber > 1) {
      updatePageNumber(PageNumber - 1);
    }
  };

  const handleNext = () => {
    updatePageNumber(PageNumber + 1);
  };

  return (
    <div className="flex items-center justify-center font-semibold text-black bg-gray-300 py-2 px-3 gap-x-2">
      {/* Prev Button */}
      <button
        onClick={handlePrev}
        disabled={PageNumber === 1}
        className="bg-gray-300 flex-shrink-0 text-xs md:text-sm lg:text-base px-2 md:px-3 py-1 rounded hover:text-white hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &lt; Prev
      </button>

      {/* Page Number */}
      <div className="text-white text-center min-w-[28px] md:min-w-[35px] font-bold bg-gray-900 px-2 py-1 rounded">
        {PageNumber}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="bg-gray-300 flex-shrink-0 text-xs md:text-sm lg:text-base px-2 md:px-3 py-1 rounded hover:text-white hover:bg-gray-900"
      >
        Next &gt;
      </button>
    </div>
  );
}

export default Pagination;
