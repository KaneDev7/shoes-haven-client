import React from 'react'
import { LuSearch } from 'react-icons/lu'

type SearchType = {
  placeholder : string
}

export default function Search({placeholder}: SearchType) {
  return (
    <div className='w-full min-w-[320px] flex items-center py-3 px-6 bg-bg_gray_light rounded-full'>
    <LuSearch className='opacity-60' />
    <input type="text" className='outline-none bg-transparent text-sm pl-2' placeholder={placeholder} />
</div>
  )
}
