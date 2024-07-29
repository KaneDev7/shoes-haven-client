"use client"
import SideBar from '@/components/client/sidebar/SideBar'
import RenderProductList from '@/components/client/products/RenderProductList'
import React, {useContext } from 'react'
import Spiner from '@/components/shared/Spiner'
import { ERROR_MESSAGE } from '@/constants/data'
import SelectSortBy from '@/components/client/products/SelectSortBy'
import { ProductsContext } from '@/context/ProductContext'
import CategoryBanner from '@/components/client/categories/CategoryBanner'
import { useSelector } from 'react-redux'


export default function Products() {
    const queryParams = useSelector(state => state.queryParams)
    const { error, isFetching, products, isLoading } = useContext(ProductsContext)
    
    const title = (queryParams.category && queryParams.category !== 'all') ? queryParams.category : 'TOUS LES PRODUITS'
    
    if (error) return <p>{ERROR_MESSAGE}</p>
    return (
        <div className='p-4'>
        <CategoryBanner/>
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
