"use client"

import { SIZES_DATA, SIZE_KEY } from '@/constants/data'
import { toggleSelectSize } from '@/redux/domains/form/product/size.slice'
import { setQueryParams } from '@/redux/domains/products/queryParams.slice'
import { dispatchQueryParams } from '@/utils/commun'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type SizeProps = {
    style?: string,
}

export default function Sizes({ style }: SizeProps) {
    const selectSizes = useSelector(state => state.selectSizes)
    const dispatch = useDispatch()

    const handleToggleSize = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const element = event.target as HTMLLIElement
        const sizeSelected = element.id.trim()
        dispatch(toggleSelectSize(sizeSelected))
        dispatchQueryParams(SIZE_KEY, sizeSelected)
    }

    return (
        <div >
            <h2 className='mb-5'>TAILLES</h2>
            <div className={`flex items-center flex-wrap gap-1 ${style}`} >
                {
                    SIZES_DATA.map(size => (
                        <span
                            onClick={handleToggleSize}
                            id={size.toString()}
                            className={`w-[30px] h-[30px] cursor-pointer flex justify-center items-center  text-xs rounded-full border-2 ${selectSizes.includes(size.toString().trim()) && 'bg-blackColor2 text-white'}`} >
                            {size}
                        </span>
                    ))
                }
            </div>
        </div>
    )
}
