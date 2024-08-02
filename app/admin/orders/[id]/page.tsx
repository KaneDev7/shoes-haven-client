"use client"
import { getOneOrder } from '@/api/orders'
import { token } from '@/components/admin/form/product/InsertProduct'
import OrderCard from '@/components/client/order/OrderCard'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'

export default function OrderDetail() {
    const orderId = useParams().id as string
    const { data: order, isLoading, error, refetch } = useQuery({
        queryKey: ['order', orderId],
        queryFn: async () => getOneOrder(token, orderId)
    })
    if(!isLoading)
    return (
        <div>
            <OrderCard order={order} />
        </div>
    )
}
