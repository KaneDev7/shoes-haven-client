"use client"

import { toggleSelectColor } from '@/redux/domains/form/colors.slice'
import { toggleSelectSize } from '@/redux/domains/form/size.slice'
import { setQueryParams } from '@/redux/domains/products/queryParams.slice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type SizeProps = {
    sizes: number[],
    style?: string,
} 

export default function Sizes({ sizes, style }: SizeProps) {
    const selectSizes = useSelector(state => state.selectSizes)
    const dispatch = useDispatch()

    const handleToggleSize = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const element = event.target as HTMLLIElement
        const sizeSelected = element.id.trim()

        dispatch(toggleSelectSize(sizeSelected))
    
        if (selectSizes.includes(sizeSelected)) {
          const selectSizeUpdated = selectSizes.filter(item => item !== sizeSelected)
          return dispatch(setQueryParams(['size', selectSizeUpdated.join(',')]))
        }
        const selectSizeUpdated = [...selectSizes, sizeSelected]
        return dispatch(setQueryParams(['size', selectSizeUpdated.join(',')]))
    }

    return (
        <div className={`flex items-center flex-wrap gap-1 ${style}`} >
            {
                sizes.map(size => (
                    <span
                        onClick={handleToggleSize}
                        id={size.toString()}
                        className={`w-[30px] h-[30px] cursor-pointer flex justify-center items-center  text-xs rounded-full border-2 ${selectSizes.includes(size.toString().trim()) && 'bg-blackColor2 text-white'}`} >
                        {size}
                    </span>
                ))
            }
        </div>
    )
}
