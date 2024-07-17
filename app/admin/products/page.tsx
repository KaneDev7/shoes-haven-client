"use client"
import Button from '@/components/admin/shared/Button.admin';
import Header from '@/components/admin/shared/Header';
import TableList from '@/components/admin/shared/TableList';
import Search from '@/components/admin/shared/Search.admin';
import { setSelectCategories } from '@/redux/domains/form/caregories.slice';
import { setSelectColors } from '@/redux/domains/form/colors.slice';
import { setFiles } from '@/redux/domains/form/file.slice';
import { setIsProducUpdate } from '@/redux/domains/form/isProducUpdate';
import { initialStateProductDefaultValue, setProductDefaultValue } from '@/redux/domains/form/productDefaultValue';
import { useRouter } from 'next/navigation';
import React, { createContext } from 'react'
import { FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { productTableHeaderList } from '@/constants/data';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/api/products';
import { setSelectSize } from '@/redux/domains/form/size.slice';


export const ProductContext = createContext(null)


export default function Products() {
  const {data : products , isLoading , error, refetch } = useQuery({
    queryKey : ['products'],
    queryFn :  async () => getProducts()
} )

  const route = useRouter()
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setSelectCategories([]))
    dispatch(setSelectColors([]))
    dispatch(setSelectSize([]))
    dispatch(setProductDefaultValue(initialStateProductDefaultValue))
    dispatch(setIsProducUpdate(false))
    dispatch(setFiles([]))

    route.push('/admin/products/add')
  }
  return (
    <ProductContext.Provider value={refetch} >
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
        refetch={refetch}
        type='products'
      />
    </div>
    </ProductContext.Provider>
  )
}
