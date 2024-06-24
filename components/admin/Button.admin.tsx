import React from 'react'
import { FiPlus } from 'react-icons/fi'


type ButtonType = {
    text: string,
    style?: string,
    icon?: React.ReactNode,
}

export default function Button({ text, style, icon }: ButtonType) {
    return (
        <div>
            <button className={`${style} flex gap-2 items-center text-nowrap text-sm  px-4 py-2 bg-secondaryColor rounded-md font-semibold opacity-90 hover:opacity-100 duration-200`} >
                {icon}{text}
            </button>
        </div>
    )
}
