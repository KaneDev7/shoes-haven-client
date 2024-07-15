"use client"
import { Product } from '@/types/product.type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'


type Productsype = {
  product?: Product
}

export default function ProductCard({ product }: Productsype) {
  const [count, setCount] = useState(0)

  const handleMouseEnter = () => {
    if (product?.uri.length > 1)
      setCount(1)
  }

  const handleMouseLeave = () => {
    setCount(0)
  }
  return (
    <Link
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href={`/products/${product?._id}`} >
      <li className='col-span-1 bg-white rounded-md shadow-md relative overflow-hidden'>
        <div className='w-full h-full self-start flex flex-col items-center justify-between '>
          <Image className='w-full h-full object-contain' src={`/uploads/${product?.uri[count]}`} height={300} width={300} alt="" />
          <div className='w-full  flex  flex-col space-y-2 p-2'>
            <span className='text-sm opacity-45'>{product?.mark} </span>
            <h2 className='font-semibold'>{product?.title} </h2>
            <p className='text-sm font-semibold'>{product?.price} FCFA</p>
          </div>
        </div>
        <span className='bg-green-600 text-white px-2 text-[10px] font-semibold rounded-md absolute left-2 top-2'>Nouveau</span>
      </li>
    </Link>

  )
}
