"use client"
import { getOrders } from '@/api/orders'
import Header from '@/components/admin/Header'
import { token } from '@/components/admin/InsertProduct'
import Search from '@/components/admin/Search.admin'
import TableList from '@/components/admin/TableList'
import { orderTableHeaderList } from '@/constants/data'
import useFetch from '@/hooks/useFetch'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function Orders() {

  const {data : orders , isLoading , error} = useQuery({
    queryKey : ['orders'],
    queryFn :  async () => getOrders(token)
} )

  return (
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
        error={error}
        type='orders'
      />
    </div>
  )
}
