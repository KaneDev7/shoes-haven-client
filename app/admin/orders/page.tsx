"use client"
import Header from '@/components/admin/Header'
import { token } from '@/components/admin/InsertProduct'
import Search from '@/components/admin/Search.admin'
import TableList from '@/components/admin/TableList'
import { orderTableHeaderList } from '@/constants/data'
import useFetch from '@/hooks/useFetch'
import React from 'react'

export default function Orders() {
  const { data, error, loading } = useFetch('/orders',{
    headers: {
      'Authorization': `Bearer ${token}`,
  }
  })
  return (
    <div className='w-full'>
      <Header title='Commandes'>
        <Search
          placeholder='Rechercher une commande'
        />
      </Header>
      <TableList
        headerList={orderTableHeaderList}
        data={data}
        loading={loading}
        error={error}
        type='orders'
      />
    </div>
  )
}
