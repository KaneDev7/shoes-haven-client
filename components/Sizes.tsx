"use client"

import React, { useState } from 'react'

type SizeProps = {
    sizes: number[],
    style?: string,
}

export default function Sizes({ sizes, style }: SizeProps) {

    const [sizeSelectedList, setSizeSelectedList] = useState<number[]>([43])

    console.log('sizeSelectedList', sizeSelectedList)
    const handleToggleSelectSize = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        console.log('hello')
        const element = event.target as HTMLLIElement
        const sizeSelected: number = Number(element.id)

        if (sizeSelectedList.includes(sizeSelected)) {
            return setSizeSelectedList(prevSelectSizelist => prevSelectSizelist.filter(size => size !== sizeSelected))
        }
        setSizeSelectedList(prevSelectSizelist => [...prevSelectSizelist, sizeSelected])
    }

    return (
        <div className={`flex items-center flex-wrap gap-1 ${style}`} >
            {
                sizes.map(size => (
                    <span
                        onClick={handleToggleSelectSize}
                        id={size.toString()}
                        className={`w-[30px] h-[30px] cursor-pointer flex justify-center items-center  text-xs rounded-full border-2 ${sizeSelectedList.includes(size) && 'bg-blackColor2 text-white'}`} >
                        {size}
                    </span>
                ))
            }
        </div>
    )
}
