import React, { useEffect } from 'react'
import { Product } from '@/types/product.type'
import ProductCard from '../products/ProductCard'
import { ProductListSkeleton } from '@/components/client/products/ProductListSkeleton'
import RenderSelectedFilter from '../products/RenderSelectedFilter'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'

type RenderProductListTypes = {
  products: Array<Product>,
  loading?: boolean
  headerRightEl?: React.ReactNode,
  title?: string,
  style?: string,
  gridParamsStyle?: string
}

type ProductList = {
  products: Array<Product>,
  gridParamsStyle?: string
}

const ProductList = ({ products, gridParamsStyle }: ProductList) => {
  if (!products) return <p>Quelques chose s'est mal passé</p>
  return (
    <ul className={`productsGrid grid ${gridParamsStyle} mt-10 gap-4 `} >
      {
        products?.map(product => (
          product.onStock && <ProductCard product={product} />
        ))
      }
    </ul>
  )
}

export default function RenderProductList({ products, title, headerRightEl, style, gridParamsStyle, loading }: RenderProductListTypes) {
  const pathName = usePathname()
  const queryParams = useSelector(state => state.queryParams)

  return (
    <div className={`${style} text-blackColor2`}  >
      <div className='globalMaxWidth px-4'>
        <header className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold uppercase '>{title}</h1>
          {headerRightEl}
        </header>
        <RenderSelectedFilter />
        <div className='flex items-center gap-4 text-sm'>
          {queryParams.price_gte && <p>Prix minimum : {queryParams.price_gte} FCFA </p>}
          {queryParams.price_lte && <p>Prix maximum : {queryParams.price_lte} FCFA </p>}

        </div>
        {
          pathName === '/products' &&
          <p className='mt-2'> {products?.length} Produit {products?.length > 1 && "s"} Trouvé{products?.length > 1 && "s"}  </p>
        }

        {
          loading ?
            <ProductListSkeleton /> :
            <ProductList
              products={products}
              gridParamsStyle={gridParamsStyle}
            />
        }

      </div>
    </div>
  )
}
