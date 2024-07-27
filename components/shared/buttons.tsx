import React from 'react'
import Spiner from './Spiner'

type ButtonType = {
    text: string,
    style?: string,
    type?: 'submit' | any
    icon?: React.ReactNode,
    handleClick?: () => void
    isLoading?: boolean
}
export default function Button({ text, style, icon, isLoading, type, handleClick }: ButtonType) {
    return (
        <button onClick={handleClick} type={type} className={`outline-none text-sm px-4 relative  ${style}`} >
            {isLoading && <Spiner/>}
            {icon}{text}
        </button>
    )
}
