import React from 'react'


type ButtonType = {
    text: string,
    style?: string,
    type?: 'submit' | any
}
export default function Button({ text, style, type }:ButtonType ) {
    return (
        <button  type={type}  className={`outline-none  text-sm px-4 ${style}`} >
            {text}
        </button>
    )
}
