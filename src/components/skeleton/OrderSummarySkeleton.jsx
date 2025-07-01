import React from "react";

const OrderSummarySkeleton = () => {
  return (
    <div className="card card-border bg-base-100 animate-pulse">
      <div className="card-body space-y-4">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-1/2" />

        {/* Price row */}
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>

        {/* Shipping row */}
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>

        {/* Coupon input */}
        <div className="flex gap-2">
          <div className="w-3/4 h-10 bg-gray-200 rounded" />
          <div className="w-1/4 h-10 bg-gray-300 rounded" />
        </div>

        {/* Subtotal row */}
        <div className="flex justify-between">
          <div className="h-5 bg-gray-300 rounded w-1/2" />
          <div className="h-5 bg-gray-300 rounded w-1/4" />
        </div>

        {/* Terms and conditions */}
        <div className="flex items-start gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>

        {/* Checkout button */}
        <div className="h-10 bg-gray-300 rounded w-full" />
      </div>
    </div>
  );
};

export default OrderSummarySkeleton;
