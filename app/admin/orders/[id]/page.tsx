"use client"
import { getOneOrder } from '@/api/orders'
import { token } from '@/components/admin/form/product/InsertProduct'
import Header from '@/components/admin/shared/Header'
import OrderCard from '@/components/client/order/OrderCard'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import { GoChevronLeft } from 'react-icons/go'

export default function OrderDetail() {
    const orderId = useParams().id as string
    const { data: order, isLoading, error, refetch } = useQuery({
        queryKey: ['order', orderId],
        queryFn: async () => getOneOrder(token, orderId)
    })

    if (!isLoading)
        return (
            <div>
                <Header title='Commandes'  >
                    <Link
                        className='flex items-center gap-2  text-blackColor2 hover:text-secondaryColor '
                        href='/admin/orders'
                    >
                        <GoChevronLeft size={25} />
                        <p>Retour au commandes</p>
                    </Link>
                </Header>
                <OrderCard order={order} />
            </div>
        )
}
