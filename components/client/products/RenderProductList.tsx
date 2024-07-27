import React, { useContext, useEffect } from 'react'
import { ProductListSkeleton } from '@/components/client/products/ProductListSkeleton'
import RenderSelectedFilter from './RenderSelectedFilter'
import { usePathname } from 'next/navigation'
import { ProductList } from './ProductList'
import { Product } from '@/types/product.type'

type RenderProductListTypes = {
  headerRightEl?: React.ReactNode,
  title?: string,
  gridParamsStyle?: string
  products: Product[]
  isLoading: boolean
}

export default function RenderProductList({ title, headerRightEl, gridParamsStyle, products, isLoading }: RenderProductListTypes) {
  const pathName = usePathname()

  return (
    <div className={`${pathName !== '/products' && 'mt-20'} text-blackColor2`}  >
      <div className='globalMaxWidth px-4'>
        <header className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold uppercase '>{title}</h1>
          {headerRightEl}
        </header>
        <RenderSelectedFilter />
        {pathName === '/products' && <p className='mt-2'> {products?.length} Produit{products?.length > 1 && "s"} Trouvé{products?.length > 1 && "s"}  </p>}

        {
          isLoading ?
            <ProductListSkeleton /> :
            <ProductList products={products} gridParamsStyle={gridParamsStyle} />
        }
      </div>
    </div>
  )
}
