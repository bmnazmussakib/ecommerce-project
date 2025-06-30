'use client'
import React, { useState } from "react";
import parse from "html-react-parser";

const DescriptionToggle = ({ data }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="card bg-base-100 card-md shadow-sm lg:w-3/4 w-full mb-5">
      <div className="card-body">
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showMore ? 'max-h-[1000px]' : 'max-h-32'
          }`}
        >
          <h3 className="text-xl font-semibold mb-3">Description</h3>
          <p className="text-gray-700 text-sm font-sans">
            {parse(data) || "No description available."}
          </p>
        </div>
        <button
          className="mt-3 text-blue-600 hover:text-blue-800 focus:outline-none bg-[linear-gradient(360deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_50%,rgba(255,255,255,0)_100%)] px-4 py-2 rounded"
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
};

export default DescriptionToggle;