'use client';
import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const SpecificationToggle = ({ data }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="card bg-base-100 card-md shadow-sm w-full lg:w-3/4 mb-5">
      <div className="card-body">
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showMore ? 'max-h-[1000px]' : 'max-h-32'
          }`}
        >
          <h3 className="text-xl font-semibold mb-3">Specification</h3>
          <h3 className="text-lg font-medium mb-3">{data.name}</h3>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>SKU: {data.sku}</li>
            <li>Barcode: {data.barcode}</li>
            <li>Stock: {data.total_stock_qty}</li>
            <li>Regular Price: ৳ {data.product_detail?.regular_price}</li>
            <li>Discount Price: ৳ {data.product_detail?.discount_price}</li>
          </ul>
        </div>

        {/* Toggle Button Centered */}
        <div className="flex justify-center">
          <button
            className="mt-3 text-neutral-500 text-lg font-medium capitalize focus:outline-none bg-[linear-gradient(360deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_50%,rgba(255,255,255,0)_100%)] px-4 py-2 rounded"
            onClick={() => setShowMore((prev) => !prev)}
          >
            <span className="flex items-center gap-2">
              {showMore ? 'Show Less' : 'Show More'}
              {showMore ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecificationToggle;
