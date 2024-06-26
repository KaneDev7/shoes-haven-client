import React from 'react'

export default function ProductSkeleton() {
    return (
        <table className='w-full mt-5'>
            <tbody className='w-full'>
                {Array.from({ length: 15 }).map((_, index) => (
                    <tr className="bg-white w-full flex items-center border-b border-black/10 animate-pulse ">

                        <td scope="row" className="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className=' flex gap-2 items-center '>
                                <div className='w-[50px] h-[50px] bg-skeletonBg animate-pulse '></div>
                                <div className='space-y-2'>
                                    <p className='w-[100px] h-[5px] bg-skeletonBg animate-pulse'> </p>
                                    <p className='w-[100px] h-[5px] bg-skeletonBg animate-pulse'> </p>
                                </div>

                            </div>
                        </td>
                        <td className="px-6 py-4 capitalize line-clamp-6"> <p className='w-[100px] h-[10px] inline-block bg-skeletonBg animate-pulse'> </p></td>
                        <td className="px-6 py-4 capitalize line-clamp-6"> <p className='w-[100px] h-[10px] inline-block bg-skeletonBg animate-pulse'> </p></td>
                        <td className="px-6 py-4 capitalize line-clamp-6"> <p className='w-[100px] h-[10px] inline-block bg-skeletonBg animate-pulse'> </p></td>
                        <td className="px-6 py-4 capitalize line-clamp-6"> <p className='w-[100px] h-[10px] inline-block bg-skeletonBg animate-pulse'> </p></td>
                        <td className="px-6 py-4 capitalize line-clamp-6"> <p className='w-[100px] h-[10px] inline-block bg-skeletonBg animate-pulse'> </p></td>

                    </tr>
                ))}
            </tbody>
        </table>

    )
}
