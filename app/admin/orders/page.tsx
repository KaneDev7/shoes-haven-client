"use client"
import { getOrders } from '@/api/orders'
import Header from '@/components/admin/shared/Header'
import { token } from '@/components/admin/form/product/InsertProduct'
import Search from '@/components/admin/shared/Search.admin'
import TableList from '@/components/admin/shared/TableList'
import { orderTableHeaderList } from '@/constants/data'
import { useQuery } from '@tanstack/react-query'
import React, { createContext } from 'react'

export const OrderContext = createContext(null)

export default function Orders() {
  const { data: orders, isLoading, error, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => getOrders(token)
  })

  return (
    <OrderContext.Provider value={{ refetch }}>
      <div className='w-full'>
        <Header title='Commandes'>
          <Search
            placeholder='Rechercher une commande'
          />
        </Header>
        <TableList
          headerList={orderTableHeaderList}
          data={orders}
          loading={isLoading}
          refetch={refetch}
          error={error}
          type='orders'
        />
      </div>
    </OrderContext.Provider>

  )
}
