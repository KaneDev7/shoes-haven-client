import React from 'react'

export default function Button({ text, style }: { text: string, style? : string }) {
    return (
        <button className={`outline-none border-none text-sm px-4 ${style}`} >
            {text}
        </button>
    )
}
