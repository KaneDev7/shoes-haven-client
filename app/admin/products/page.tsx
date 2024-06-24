import Button from '@/components/admin/Button.admin';
import Header from '@/components/admin/Header';
import ProductList from '@/components/admin/ProductList';
import Search from '@/components/admin/Search.admin';
import Link from 'next/link';
import React from 'react'
import { FiPlus } from 'react-icons/fi';


export default function Products() {
  return (
    <div className='w-full'>
      <Header>
        <Search />
        <Link href='/admin/products/add'>
          <Button
            text='Ajouter un Produit'
            icon={<FiPlus size={20} />}
          />
        </Link>
      </Header>
      <ProductList/>
    </div>

  )
}
