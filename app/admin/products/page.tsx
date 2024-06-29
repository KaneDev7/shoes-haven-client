"use client"
import Button from '@/components/admin/Button.admin';
import Header from '@/components/admin/Header';
import TableList from '@/components/admin/TableList';
import ProductListTable from '@/components/admin/TableList';
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


export default function Products() {
  const { data, error, loading } = useFetch('/products')

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
          style='bg-secondaryColor'
        />
      </Header>
      <TableList
        headerList={productTableHeaderList}
        data={data}
        loading={loading}
        error={error}
        type='products'
      />
    </div>

  )
}
