import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductSliderSkeleton = () => {
  return (
    <div className="w-full">
      {/* Main Image Skeleton */}
      <div className="w-full aspect-square mb-4">
        <Skeleton height="100%" width="100%" />
      </div>

      {/* Thumbnail Skeletons */}
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="w-20 h-20">
            <Skeleton width="100%" height="100%" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductSliderSkeleton
