"use client"
import { Product } from '@/types/product.type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
 

type Productsype = {
    product?: Product
}

export default function ProductCard({product}: Productsype) {
  const [count, setCount] = useState(0)

const handleMouseEnter = () => {
  setCount(2)
}

const handleMouseLeave = () => {
  setCount(0)
}
  return (
  <Link 
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  href={`/products/${product?._id}`} >
      <li className='col-span-1 bg-white rounded-md shadow-md relative'>
      <div className='w-full h-full flex flex-col items-center justify-between p-2'>
        <Image className='w-[80%] object-contain my-5'  src={`/uploads/${product?.uri[count]}`} height={300} width={300} alt="" />
        <div className='w-full flex  flex-col space-y-2'>
            <span className='text-sm opacity-45'>{product?.mark.split(' ')[1]} </span>
            <h2 className='font-semibold'>{product?.title} </h2>
            <p className='text-sm font-semibold'>{product?.price} FCFA</p>
        </div>
      </div>
      <span className='bg-secondaryColor px-2 text-[10px] font-semibold rounded-md absolute left-2 top-2'>Nouveau</span>
    </li>
  </Link>

  )
}
