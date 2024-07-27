"use client"
import SideBar from '@/components/client/sidebar/SideBar'
import RenderProductList from '@/components/client/products/RenderProductList'
import Image from 'next/image'
import React, {useContext } from 'react'
import { useSelector } from 'react-redux'
import Spiner from '@/components/shared/Spiner'
import useCategoryUri from '@/hooks/useCategoryUri'
import { ERROR_MESSAGE } from '@/constants/data'
import SelectSortBy from '@/components/client/products/SelectSortBy'
import { ProductsContext } from '@/context/ProductContext'


export default function Products() {
    const queryParams = useSelector(state => state.queryParams)
    const { categoryUri } = useCategoryUri(queryParams.category)
    const { error, isFetching, products, isLoading } = useContext(ProductsContext)

    const title = (queryParams.category && queryParams.category !== 'all') ? queryParams.category : 'TOUS LES PRODUITS'
    
    if (error) return <p>{ERROR_MESSAGE}</p>
    return (
        <div className='p-4'>
            {
                categoryUri &&
                <header className='globalMaxWidth mb-10 overflow-hidden rounded-md mt-4'>
                    <Image
                        width={1000}
                        height={1000}
                        src={`/uploads/categories/${categoryUri}`}
                        alt=''
                        className='w-full max-h-[300px] object-cover'
                    />
                </header>
            }

            <section className='mt-20 '>
                <div className='globalMaxWidth block lg:flex items-start justify-start gap-5 relative'>
                    <SideBar />
                    <div className='flex-1 relative '>
                        {isFetching && <Spiner />}
                        <RenderProductList
                            products={products}
                            isLoading={isLoading}
                            title={title}
                            gridParamsStyle='productsPage sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                            headerRightEl={<SelectSortBy />}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}
