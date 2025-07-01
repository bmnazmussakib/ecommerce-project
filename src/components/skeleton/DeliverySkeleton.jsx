import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DeliveryOptionsSkeleton = () => {
  return (
    <div className="card card-border border-neutral-200 bg-base-100 rounded-5xl">
      <div className="card-body">
        <h2 className="text-lg font-semibold mb-2">
          <Skeleton width={140} height={20} />
        </h2>
        <ul className="text-sm text-gray-700 space-y-6">
          {[1, 2].map((_, i) => (
            <li key={i}>
              <div className="flex align-top gap-3">
                <div className="icon">
                  <Skeleton circle width={24} height={24} />
                </div>
                <div className="content w-full">
                  <Skeleton width="40%" height={16} className="mb-2" />
                  <Skeleton width="60%" height={14} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DeliveryOptionsSkeleton
