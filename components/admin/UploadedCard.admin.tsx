import Image from 'next/image'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { imageDataType } from './InsertProduct'

export default function UploadedCard({uri, name}:imageDataType) {
  return (
    <li className='w-full flex justify-between items-center border-2 py-2 px-4'>
    <div className='flex gap-2'>
      <img className='w-[80px] h-[80px] object-cover' width={100} height={100}  src={uri} alt="" />
      <div className='opacity-80'>
        <p> {name} </p>
        <p className=''>482 kb</p>
      </div>
    </div>
    <AiOutlineDelete size={25} color='red'/>
  </li>
  )
}
