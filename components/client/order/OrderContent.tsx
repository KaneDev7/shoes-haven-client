"use client"
import React, { useContext } from 'react'
import OrderProductCard from './OrderProductCard'
import OrderInfos from './OrderInfos'
import { OrderCardContext } from './OrderCard'
import { usePathname } from 'next/navigation'


export default function OrderContent() {
  const {items, total_price, isShowContent} = useContext(OrderCardContext)
  const pathname = usePathname()
  const isAdminPage = pathname.includes('/admin')

  if(isShowContent || isAdminPage)
  return (
    <div className='flex flex-col lg:flex-row mt-5' >
      <div className='flex-1 p-4'>
        <h3>Produits</h3>
        <ul className='w-full mt-5 space-y-4 '>
          {
            items.map(item => (
              <OrderProductCard item={item} />
            ))
          }
        </ul>
        <div className='w-full flex items-center justify-end mt-7 border-t py-4 '>
          <small className='text-black/50 text-sm'>Total : {total_price} FCFA</small>
        </div>
      </div>
      <OrderInfos />
    </div>
  )
}
