import React from 'react'

const BreadCrumbs = () => {
    return (
        <>
        <div className='bg-gray-100'>

            <div className='w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 '>
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>Documents</a></li>
                        <li>Add Document</li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}

export default BreadCrumbs