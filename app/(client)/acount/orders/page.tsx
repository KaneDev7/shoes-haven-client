"use client"
import { getOrdersForCurrentUser } from '@/api/orders'
import OrderCard from '@/components/client/order/OrderCard'
import ProfileNav from '@/components/client/profile/ProfileNav'
import Spiner from '@/components/shared/Spiner'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Orders() {
  const currentUser = useSelector(state => state.currentUser)
  const token = currentUser.token

  const { data: orders, isLoading, error, refetch } = useQuery({
    queryKey: ['userOrder'],
    queryFn: async () => getOrdersForCurrentUser(token)
  })

  if(!isLoading)
  return (
    <div className='globalMaxWidth mt-20 bg-white '>
      <h1 className='font-bold text-2xl'>Mon compte </h1>
      <ProfileNav />
      <div>
        <ul className='space-y-10'>
          {isLoading && <Spiner />}
          { orders?.map(order => (<OrderCard order={order} /> ))}
        </ul>
      </div>
    </div>
  )
}
