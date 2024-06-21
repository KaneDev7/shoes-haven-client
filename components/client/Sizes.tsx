"use client"

import useSelectList from '@/hooks/useSelectList'
import React, { useState } from 'react'

type SizeProps = {
    sizes: number[],
    style?: string,
}

export default function Sizes({ sizes, style }: SizeProps) {

    const { handleToggleSelect, selectlist } = useSelectList({ list: [43]})

    const handleToggleSelectSize = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const element = event.target as HTMLLIElement
        const sizeSelected: number = Number(element.id)
        handleToggleSelect(sizeSelected)
    }

    return (
        <div className={`flex items-center flex-wrap gap-1 ${style}`} >
            {
                sizes.map(size => (
                    <span
                        onClick={handleToggleSelectSize}
                        id={size.toString()}
                        className={`w-[30px] h-[30px] cursor-pointer flex justify-center items-center  text-xs rounded-full border-2 ${selectlist.includes(size) && 'bg-blackColor2 text-white'}`} >
                        {size}
                    </span>
                ))
            }
        </div>
    )
}
