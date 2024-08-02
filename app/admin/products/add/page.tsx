"use client"
import Header from '@/components/admin/shared/Header';
import InsertProduct from '@/components/admin/form/product/InsertProduct';
import Link from 'next/link';
import React from 'react'
import { GoChevronLeft } from 'react-icons/go';

export default function Products() {

  return (
    <div className='w-full'>
      <Header title='Ajouter un Produit '>
        <Link
          className='flex items-center gap-2  text-blackColor2 hover:text-secondaryColor '
          href='/admin/products'
        >
          <GoChevronLeft size={25} />
          <p>Retour au produits</p>
        </Link>
      </Header>
      <InsertProduct />
    </div>

  )
}
