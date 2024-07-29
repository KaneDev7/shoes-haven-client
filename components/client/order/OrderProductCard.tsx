import { getOneProduct } from '@/api/products'
import Spiner from '@/components/shared/Spiner'
import { CartItem } from '@/types/cart.type'
import { Product } from '@/types/product.type'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'

export default function OrderProductCard({ item }: { item: CartItem }) {

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', item.productId],
    queryFn: async () => getOneProduct(item.productId)
  })
  const product = data as Product

  return (
    <li className='flex w-full items-center justify-between relative'>
      {isLoading && <Spiner />}
      <div className='flex items-center gap-4'>
        <Image
          src={`/uploads/${product?.uri[0]}`}
          width={90}
          height={90}
          className='rounded-md'
          alt='' />
        <div className=''>
          <h2 className='font-bold text-blackColor2 text-lg'>{product?.title} </h2>
          <p>
            <small className='text-black/50 border-r border-black/40 pr-4'>Taille : {item.size} </small>
            <small className='text-black/50 pl-4'>Quantités : {item.quantity} </small>
          </p>
        </div>
      </div>
      <h2 className='font-semibold text-blackColor2'>{product?.price} FCFA</h2>
    </li>
  )
}
