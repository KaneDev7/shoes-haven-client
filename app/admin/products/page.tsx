"use client"
import Button from '@/components/admin/Button.admin';
import Header from '@/components/admin/Header';
import TableList from '@/components/admin/TableList';
import Search from '@/components/admin/Search.admin';
import useFetch from '@/hooks/useFetch';
import { setSelectCategories } from '@/redux/domains/form/caregories.slice';
import { setSelectColors } from '@/redux/domains/form/colors.slice';
import { setFiles } from '@/redux/domains/form/file.slice';
import { setIsProducUpdate } from '@/redux/domains/form/isProducUpdate';
import { initialStateProductDefaultValue, setProductDefaultValue } from '@/redux/domains/form/productDefaultValue';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { productTableHeaderList } from '@/constants/data';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/api/products';


export default function Products() {
  const {data : products , isLoading , error} = useQuery({
    queryKey : ['products'],
    queryFn :  async () => getProducts()
} )

  const route = useRouter()
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setSelectCategories([]))
    dispatch(setSelectColors([]))
    dispatch(setProductDefaultValue(initialStateProductDefaultValue))
    dispatch(setIsProducUpdate(false))
    dispatch(setFiles([]))

    route.push('/admin/products/add')
  }
  return (
    <div className='w-full'>
      <Header>
        <Search
          placeholder='Rechercher un produit'
        />
        <Button
          handleClick={handleClick}
          text='Ajouter un Produit'
          icon={<FiPlus size={20} />}
          style='bg-secondaryColor rounded-md'
        />
      </Header>
      <TableList
        headerList={productTableHeaderList}
        data={products}
        loading={isLoading}
        error={error}
        type='products'
      />
    </div>

  )
}
