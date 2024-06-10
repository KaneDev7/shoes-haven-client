import { Product } from '@/types/product'
import Image from 'next/image'
import React from 'react'
 

type Productsype = {
    product: Product
}

export default function ProductCard({product}: Productsype) {
  return (
    <li className='col-span-1 bg-white rounded-md relative'>
      <div className='w-full h-full flex flex-col justify-between p-2'>
        <Image className='w-full object-cover' src={`/uploads/${product.uri[0]}`} height={300} width={300} alt="" />
        <div className='space-y-2'>
            <span className='text-sm opacity-45'>{product.mark} </span>
            <h2 className='font-semibold'>{product.title} </h2>
            <p className='text-sm font-semibold'>{product.price} FCFA</p>
        </div>
      </div>
      <span className='bg-secondaryColor px-2 text-[10px] font-semibold rounded-md absolute left-2 top-2'>Nouveau</span>
    </li>
  )
}
