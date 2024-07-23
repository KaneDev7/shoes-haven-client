import InsertMark from '@/components/admin/form/mark/InsertMark'
import Header from '@/components/admin/shared/Header'
import ProductNav from '@/components/admin/shared/ProductNav'
import React from 'react'

export default function Mark() {
  return (
    <div className='w-full'>
      <Header title='Ajouter une marque'></Header>
      <ProductNav />
      <InsertMark/>
    </div>
  )
}
