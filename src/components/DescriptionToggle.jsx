'use client'
import React, { useState } from "react";
import parse from "html-react-parser";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
          <h3 className="text-xl font-medium mb-3">Description</h3>
          <div className="text-neutral-600 text-sm font-sans parsed-text parse-description" style={{ fontFamily: "'Onest', sans-serif", color: "#475569" }}>
            {parse(data) || "No description available."}
          </div>
        </div>
        

        <div className="flex justify-center">
          <button
            className="mt-3 text-neutral-500 text-lg font-medium capitalize focus:outline-none bg-[linear-gradient(360deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_50%,rgba(255,255,255,0)_100%)] px-4 py-2 rounded"
            onClick={() => setShowMore((prev) => !prev)}
          >
            <span className="flex items-center gap-2">
              {showMore ? "Show Less" : "Show More"}
              {showMore ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DescriptionToggle;
