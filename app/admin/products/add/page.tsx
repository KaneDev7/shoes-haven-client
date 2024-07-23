"use client"
import Button from '@/components/admin/shared/Button.admin';
import Header from '@/components/admin/shared/Header';
import InsertProduct from '@/components/admin/form/product/InsertProduct';
import Link from 'next/link';
import React from 'react'
import ProductNav from '@/components/admin/shared/ProductNav';


export default function Products() {

  return (
    <div className='w-full'>
      <Header title='Ajouter un Produit'>
        <Link
          href='/admin/products'
        >
          <Button
            text='Retour'
            style='h-full border-2 bg-transparent border-secondaryColor  '
          />
        </Link>
      </Header>
      <ProductNav />
      <InsertProduct />
    </div>

  )
}
