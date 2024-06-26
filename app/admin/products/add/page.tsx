"use client"
import Button from '@/components/admin/Button.admin';
import Header from '@/components/admin/Header';
import InsertProduct from '@/components/admin/InsertProduct';
import React from 'react'
import { FiPlus } from 'react-icons/fi';


export default function Products() {
  
  return (
    <div className='w-full'>
      <Header title='Ajouter un Produit'>
        <Button
          text='Ajouter un Produit'
          icon={<FiPlus size={20} />}
        />
      </Header>
      <InsertProduct />
    </div>

  )
}
