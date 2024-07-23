"use client"
import { getOneProduct, getProducts } from '@/api/products'
import { token } from '@/components/admin/form/product/InsertProduct'
import ProductDeatilSkeleton from '@/components/client/products/ProductDeatilSkeleton'
import ProductDetail from '@/components/client/productDetails/ProductDetail'
import RenderProductList from '@/components/client/containers/RenderProductList'
import { Product } from '@/types/product.type'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'

export default function page() {
    const param = useParams()
    const productId = param.id as string

    const {data : similarProducts , isLoading : similarProductsLoding} = useQuery({
        queryKey : ['products'],
        queryFn :  async () => getProducts(token)
    } )

    const {data , isLoading, error} = useQuery({
        queryKey : ['product', productId],
        queryFn :  async () => getOneProduct(productId)
    })

    const product = data as Product
    
    if (isLoading) return <ProductDeatilSkeleton/>

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
