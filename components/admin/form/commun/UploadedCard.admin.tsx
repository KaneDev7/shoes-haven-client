"use client"
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { imageDataType } from '../product/InsertProduct'
import { troncText } from '@/utils/commun'

export default function UploadedCard({ uri, name, onDeletFile }: imageDataType) {

  const handleClick = () => {
    if (onDeletFile) {
      onDeletFile(uri, name)
    }
  }

  return (
    <li className='w-full flex justify-between items-center border-2 py-2 px-4 rounded-md'>
      <div className='flex gap-2'>
        <img className='w-[80px] h-[80px] object-cover rounded-md' width={100} height={100} src={uri} alt="" />
        <div className='opacity-80'>
          <p> {troncText(name, 20)} </p>
          <p className=''>482 kb</p>
        </div>
      </div>
      <AiOutlineDelete
        onClick={handleClick}
        size={25} color='red' />
    </li>
  )
}
