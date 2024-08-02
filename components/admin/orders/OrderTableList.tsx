"use client"
import { Order } from '@/types/product.type'
import React from 'react'
import OrderTableRow from './OrderTableRow';

type OrderListTableType = {
    orders: Order[]
    checkOneItem: () => { id: string, event: any }
    itemsId: string[]
}

export default function OrderTableList({ orders, itemsId, checkOneItem }: OrderListTableType) {
    return (
        <>
            <tbody className='w-full'>
                {
                    orders?.map(order => (
                        <OrderTableRow
                            order={order}
                            itemsId={itemsId}
                            checkOneItem={checkOneItem} />
                    ))
                }
            </tbody>

        </>
    )
}

