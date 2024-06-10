import React from 'react'

const sizeActive = 41

type SizeProps = {
    sizes: number[]
}

export default function Sizes({ sizes }: SizeProps) {
    return (
        <div className='flex items-center gap-1'>
            {
                sizes.map(size => (
                    <span
                        className={`w-[30px] h-[30px] flex justify-center items-center text-xs rounded-full border-2 ${sizeActive === size && 'bg-blackColor2 text-white'}`} >
                        {size}
                    </span>
                ))
            }
        </div>
    )
}
