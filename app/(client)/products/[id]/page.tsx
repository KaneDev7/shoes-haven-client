"use client"
import ProductDetail from '@/components/client/ProductDetail'
import RenderProductList from '@/components/client/containers/RenderProductList'
import useFetch from '@/hooks/useFetch'
import useFetchOne from '@/hooks/useFetchOne'
import { Product } from '@/types/product.type'
import { useParams } from 'next/navigation'
import React from 'react'

export default function page() {
    const param = useParams()
    const { data : similarProducts, loading : similarProductsLoding } = useFetch('/products')
    const { data, loading, error } = useFetchOne(`/products/${param.id}`)
    const product = data as Product
    if (!loading)
        return (
            <div className='p-4'>
                <ProductDetail
                    product={product}
                />
                <div className='flex-1 mt-40'>
                    <RenderProductList
                        products={similarProducts}
                        loading={similarProductsLoding}
                        title="PRODUITS SIMILAIRES"
                        gridParamsStyle='productsPage sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
                    />
                </div>
            </div>
        )
}
