import React from 'react'

type InputType = {
    label: string,
    placeholder: string,
    variant?: 'long' | 'cours'
    type : 'text' | 'number'
}

export default function Input({ label, placeholder, variant, type }: InputType) {
    return (
        <div className='flex flex-col gap-2'>
            <label className='text-sm opacity-80'>{label}</label>
            {
                variant === "long" ?
                    <textarea
                        placeholder={placeholder}
                        className='min-h-[100px] px-2 py-3 border-2 bg-gray-50 text-sm outline-none resize-none'
                    >
                    </textarea> :
                    <input
                        type={type}
                        placeholder={placeholder}
                        className=' px-2 py-3 border-2 bg-gray-50 text-sm outline-none '
                    />
            }
        </div>
    )
}
