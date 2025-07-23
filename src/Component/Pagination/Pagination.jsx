import { useState } from "react";

function Pagination({ PageNumber, updatePageNumber}){
    
    const handlePrev = () =>{
        if (PageNumber > 1){
            updatePageNumber(PageNumber - 1);
        }
    }

    const handleNext = ()=> {
        updatePageNumber(PageNumber + 1);
    }

    return <div className="flex items-center justify-center font-semibold text-black bg-gray-300">
        <button 
            onClick={handlePrev} disabled={PageNumber === 1}
            className="bg-gray-300 text-xs mx-1 p-0.5 hover:text-white hover:bg-gray-900  pointer w-[5%] h-full"
        > &lt; Prev </button>
        <div className="text-white text-center w-[25px] font-bold bg-gray-900 p-0.5">
            {PageNumber}
        </div>
        <button 
            onClick={handleNext}
            className="bg-gray-300 text-xs mx-1 p-0.5 hover:text-white hover:bg-gray-900 pointer w-[5%] h-full"
        > Next &gt; </button>
    </div>
}

export default Pagination;