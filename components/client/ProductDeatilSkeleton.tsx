import React from 'react'


export default function ProductDeatilSkeleton() {

    return (
        <div className='globalMaxWidth flex flex-col gap-10 lg:flex-row mt-10 bg-white p-4 '>

            <div className='lg:w-[50%] w-full flex gap-4 flex-col-reverse lg:flex-row items-center  '>

                {/* Small images */}
                <div className='flex flex-row lg:flex-col w-full lg:w-[15%] gap-6'>
                    {
                        Array.from({ length: 4 }).map((_, index) => (
                            <div className='w-full h-[100px]  bg-skeletonBg animate-pulse'></div>
                        ))
                    }
                </div>

                {/* Silddes */}
                <div className='lg:w-[80%] h-full w-full flex items-center select-none'>
                    <div className='w-full lg:h-full h-[400px] bg-skeletonBg animate-pulse'></div>
                </div>
            </div>

            <div className='flex-1'>
                <div className='flex flex-col gap-8 text-blackColor2'>
                    <h1 className='h-[20px] bg-skeletonBg animate-pulse'> </h1>
                    <div className='lg:max-w-[80%] w-full space-y-3'>
                        <p className='w-full h-[10px] bg-skeletonBg animate-pulse'> </p>
                        <p className='w-full h-[10px] bg-skeletonBg animate-pulse'> </p>
                        <p className='w-full h-[10px] bg-skeletonBg animate-pulse'> </p>
                        <p className='w-full h-[10px] bg-skeletonBg animate-pulse'> </p>
                    </div>
                    <h2 className='h-[15px] w-[200px] bg-skeletonBg animate-pulse '> </h2>

                    <div className='flex gap-2 flex-wrap'>
                        {
                            Array.from({ length: 5 }).map((_, index) => (
                                <div className='w-[50px] h-[50px] rounded-lg bg-skeletonBg animate-pulse' ></div>
                            ))
                        }
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h2 className='h-[15px] w-[200px] bg-skeletonBg animate-pulse'> </h2>
                        <div className='flex gap-2 flex-wrap'>
                            {
                                Array.from({ length: 5 }).map((_, index) => (
                                    <div className='w-[60px] h-[40px] bg-skeletonBg animate-pulse' ></div>
                                ))
                            }
                        </div>
                        <div className='w-[70%] h-[60px] rounded-full bg-skeletonBg animate-pulse'></div>
                    </div>

                </div>
            </div>
        </div>
    )
}
