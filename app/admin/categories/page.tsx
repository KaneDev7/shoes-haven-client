import InsertCategory from '@/components/admin/form/InsertCategory'
import Header from '@/components/admin/shared/Header'
import Button from '@/components/client/shared/buttons'
import Link from 'next/link'
import React from 'react'

export default function Category() {
  return (
    <div className='w-full '>
      <Header title='Ajouter une Catégorie'>
      </Header>
      <InsertCategory/>
    </div>
  )
}
