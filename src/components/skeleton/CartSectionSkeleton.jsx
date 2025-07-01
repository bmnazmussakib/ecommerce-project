import React from "react";

const CartSectionSkeleton = () => {
  return (
    <div className="card border-0 bg-base-100 animate-pulse">
      <div className="card-body">
        {/* Header skeleton */}
        <div className="flex items-center justify-between gap-4">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="flex items-center gap-4">
            <div className="h-6 bg-gray-200 rounded w-24" />
            <div className="h-6 bg-gray-200 rounded w-16" />
          </div>
        </div>
      </div>

      <div className="card-body pt-0 pr-0">
        <div className="space-y-8">
          {[1, 2].map((brandIndex) => (
            <div key={brandIndex}>
              {/* Brand title skeleton */}
              <div className="flex items-center mb-4 bg-gray-100 py-2 px-3">
                <div className="w-5 h-5 bg-gray-300 rounded mr-2" />
                <div className="w-20 h-5 bg-gray-300 rounded" />
              </div>

              {/* Items under brand */}
              <div className="space-y-6">
                {[1, 2].map((itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-start border-0 rounded-md p-4 bg-gray-50"
                  >
                    <div className="w-4 h-4 bg-gray-300 rounded mr-3" />
                    <div className="w-20 h-20 bg-gray-300 rounded" />

                    <div className="flex-1 ml-4 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />

                      <div className="h-4 bg-gray-200 rounded w-1/3 lg:hidden" />

                      <div className="flex items-center mt-2">
                        <div className="flex items-center gap-2 w-32">
                          <div className="w-6 h-6 bg-gray-300 rounded-full" />
                          <div className="w-6 h-6 bg-gray-300 rounded" />
                          <div className="w-6 h-6 bg-gray-300 rounded-full" />
                        </div>
                        <div className="ml-6 w-5 h-5 bg-gray-300 rounded" />
                      </div>
                    </div>

                    <div className="hidden lg:block text-end ml-4">
                      <div className="h-4 bg-gray-300 rounded w-16 mb-1" />
                      <div className="h-3 bg-gray-200 rounded w-12" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartSectionSkeleton;
