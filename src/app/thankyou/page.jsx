import Link from 'next/link';
import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";

const page = () => {
    return (
        <div className='lg:py-50 md:py-40 py-20 bg-gray-100 flex items-center justify-center'>
            <div className='text-center flex-column flex-col items-center justify-center'>
                <FaCircleCheck className='lg:text-9xl md:text-7xl text-5xl text-[#00A788] mb-6 mx-auto' />
                <h2 className='lg:text-5xl text-3xl font-semibold text-neutral-500 mb-6'>Thank you for your purchase!</h2>
                <Link href={'/'} className="btn lg:btn-lg md:btn-md bg-[#0F172A] text-white w-1/2">Home</Link>
            </div>
        </div>
    )
}

export default page;
