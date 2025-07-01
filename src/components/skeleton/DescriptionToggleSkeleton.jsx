'use client'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DescriptionToggleSkeleton = () => {
  return (
    <div className="card bg-base-100 card-md shadow-sm lg:w-3/4 w-full mb-5">
      <div className="card-body">
        {/* Title Skeleton */}
        <Skeleton width={120} height={24} className="mb-3" />

        {/* Paragraph Skeleton */}
        <div className="space-y-2 mb-4">
          <Skeleton count={3} height={12} />
        </div>

        {/* Button Skeleton */}
        <div className="w-24">
          <Skeleton height={32} />
        </div>
      </div>
    </div>
  )
}

export default DescriptionToggleSkeleton
