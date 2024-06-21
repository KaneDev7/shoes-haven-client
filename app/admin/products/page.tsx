"use client"
import Header from '@/components/admin/Header';
import InsertProduct from '@/components/admin/InsertProduct';
import React from 'react'


export default function Products() {
  return (
      <div className='w-full'>
        <Header />
        <InsertProduct />
      </div>

  )
}
