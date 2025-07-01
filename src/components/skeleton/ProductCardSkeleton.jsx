
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ImagePlaceholder from '../../../public/images/image.json'

const ProductCardSkeleton = () => {
    return (
        <div className="card bg-base-100 shadow-sm h-full">
            <div className="card-body text-center">
                <Skeleton height={250} width="100%" />
                <div className='mt-5'>
                    <Skeleton width="100%" height={20} />
                </div>
                    <Skeleton width={100} height={20} />
                    <Skeleton height={40} width={'100%'} />
            </div>
        </div>
    )
}

export default ProductCardSkeleton
