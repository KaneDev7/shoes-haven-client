import React, { useContext } from 'react'
import { OrderCardContext } from './OrderCard'
import { useSelector } from 'react-redux'
import { User } from '@/types/user.type'
import OrderStatus from '@/components/shared/OrderStatus'

export default function OrderInfos() {
    const currentUser: User = useSelector(state => state.currentUser)
    const { payment_method, status } = useContext(OrderCardContext)

    return (
        <div className='flex-1  p-4 lg:border-l border-black/10  '>
            <div className='p-4 border-b border-black/10'>
                <h2 className='text-lg font-semibold'>Payement</h2>
                <small className='text-black/50  pr-4 text-sm'>{payment_method}</small>
            </div>

            <div className='p-4  border-b  border-black/10'>
                <h2 className='text-lg font-semibold'>Livraison</h2>
                <ul className='space-y-1'>
                    <li className='py-2'>
                        <small className='text-black/50 font-semibold text-sm'>Adress</small>
                        <h2> {currentUser?.address?.city}, {currentUser?.address?.street}</h2>
                    </li>
                    <li>
                        <small className='text-black/50  font-semibold text-sm '>Status</small>
                        <div className='mt-2'>
                            <OrderStatus status={status} />
                        </div>
                    </li>
                </ul>
            </div>

            <div className='p-4'>
                <h2 className='text-lg font-semibold'>Expédition</h2>
                <div className='space-y-1 mt-2'>
                    <small className='text-black/50  pr-4 text-sm block'>Livraison Locale</small>
                    <small className='text-black/50  pr-4 text-sm block'>Expédition gratuit</small>
                </div>
            </div>
        </div>
    )
}
