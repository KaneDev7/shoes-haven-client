import Image from 'next/image'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

export default function UploadedCard() {
  return (
    <li className='w-full flex justify-between items-center border-2 py-2 px-4'>
    <div className='flex gap-2'>
      <Image src='/1.jpeg' width={100} height={100} alt='' />
      <div className='opacity-80'>
        <p>image1.jpeg</p>
        <p className=''>482 kb</p>
      </div>
    </div>
    <AiOutlineDelete size={25} color='red'/>
  </li>
  )
}
