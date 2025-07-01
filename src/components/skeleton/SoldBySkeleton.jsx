import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SoldBySkeleton = () => {
  return (
    <div className="card card-border border-neutral-200 bg-base-100 rounded-5xl">
      <div className="card-body">
        {/* Title */}
        <h2 className="text-sm font-normal mb-2">
          <Skeleton width={60} />
        </h2>

        {/* Merchant Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="image">
            <Skeleton circle width={48} height={48} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Skeleton width={120} height={18} />
            <Skeleton width={60} height={14} />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-3 border-b border-neutral-200 pb-3">
          <Skeleton height={36} width="100%" />
          <Skeleton height={36} width="100%" />
        </div>

        {/* Stats */}
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 justify-between items-center mt-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="text-left lg:text-center w-full">
              <Skeleton width={100} height={16} className="mb-1" />
              <Skeleton width={40} height={28} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SoldBySkeleton
