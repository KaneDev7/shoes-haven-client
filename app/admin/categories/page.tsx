import InsertCategory from '@/components/admin/form/category/InsertCategory'
import Header from '@/components/admin/shared/Header'
import ProductNav from '@/components/admin/shared/ProductNav'
import React from 'react'

export default function Category() {
  return (
    <div className='w-full '>
      <Header title='Ajouter une Catégorie'> </Header>
      <ProductNav />
      <InsertCategory />
    </div>
  )
}
