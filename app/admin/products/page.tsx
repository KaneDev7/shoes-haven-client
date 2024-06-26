"use client"
import Button from '@/components/admin/Button.admin';
import Header from '@/components/admin/Header';
import ProductList from '@/components/admin/ProductList';
import Search from '@/components/admin/Search.admin';
import { setSelectCategories } from '@/redux/domains/form/caregories.slice';
import { setSelectColors } from '@/redux/domains/form/colors.slice';
import { setIsProducUpdate } from '@/redux/domains/form/isProducUpdate';
import { initialStateProductDefaultValue, setProductDefaultValue } from '@/redux/domains/form/productDefaultValue';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';


export default function Products() {
  const route = useRouter()
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setSelectCategories([]))
    dispatch(setSelectColors([]))
    dispatch(setProductDefaultValue(initialStateProductDefaultValue))
    dispatch(setIsProducUpdate(false))
    route.push('/admin/products/add')
  }
  return (
    <div className='w-full'>
      <Header>
        <Search />
          <Button
          handleClick={handleClick}
            text='Ajouter un Produit'
            icon={<FiPlus size={20} />}
            style='bg-secondaryColor'
          />
      </Header>
      <ProductList/>
    </div>

  )
}
