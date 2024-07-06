import React from 'react'


type ButtonType = {
    text: string,
    style?: string,
    type?: 'submit' | any
    icon?: React.ReactNode,
    handleClick?: () => void
}
export default function Button({ text, style, icon,  type, handleClick }:ButtonType ) {
    return (
        <button onClick={handleClick} type={type}  className={`outline-none  text-sm px-4 ${style}`} >
          {icon}{text}
        </button>
    )
}
