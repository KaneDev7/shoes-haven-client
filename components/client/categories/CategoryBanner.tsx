import useCategoryUri from '@/hooks/useCategoryUri'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

export default function CategoryBanner() {
    const queryParams = useSelector(state => state.queryParams)
    const { categoryUri } = useCategoryUri(queryParams.category)

    if (categoryUri)
        return (
            <header className='globalMaxWidth mb-10 overflow-hidden rounded-md mt-4'>
                <Image
                    width={1000}
                    height={1000}
                    src={`/uploads/categories/${categoryUri}`}
                    alt=''
                    className='w-full max-h-[300px] object-cover'
                />
            </header>
        )
}
