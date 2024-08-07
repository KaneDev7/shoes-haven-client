"use client"
import React from 'react'
import Button from '../../shared/buttons'
import Image from 'next/image'
import { Category } from '@/types/category.type'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { initQueryParams, setQueryParams } from '@/redux/domains/products/queryParams.slice'
import { CATEGORY_KEY } from '@/constants/data'

type CatCardType = {
  category: Category
  style: string
}

export default function CatCard({ style, category } : CatCardType) {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(initQueryParams())
    dispatch(setQueryParams([CATEGORY_KEY, category.name]))
    router.push(`/products`)
  }

  return (
    <div className={`${style} h-[400px] rounded-lg overflow-hidden relative group`}  >
      <div className='w-full flex items-end absolute inset-0 z-[1] bg-gradient-to-t from-black/80 to-black/5'>
        <div className='text-white flex flex-col gap-4 p-4 ' >
          <h2 className='text-3xl font-bold'>{category.name}</h2>
          <p className=''>{category.description}</p>
            <Button handleClick={handleClick} text='Découvrir' style='bg-secondaryColor py-2 text-black font-bold rounded-full' />
        </div>
      </div>
      <Image
        className='absolute z-[-1] w-full h-full object-cover group-hover:scale-[1.3] duration-1000 '
        src={`/uploads/categories/${category.uri}`}
        width={500}
        height={500}
        alt=""
      />
    </div>
  )
}
