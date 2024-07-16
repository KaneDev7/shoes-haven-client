import React from 'react'

type InputType ={
    value : string | number,
    type : 'number' | 'text' | 'email',
    placeholder : string,
    style? : string
}

export default function Input({value, type, placeholder,style}:InputType) {
  return (
   <input className={`h-full px-4 outline-none border-2 focus:border-secondaryColor border-black/5 rounded-md bg-[#E6E6E6] ${style}`} type={type} placeholder={placeholder} />
  )
}
