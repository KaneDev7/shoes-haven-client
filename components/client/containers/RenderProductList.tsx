import React from 'react'
import { Product } from '@/types/product.type'
import ProductCard from '../ProductCard'
import { ProductListSkeleton } from '@/components/client/ProductListSkeleton'

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
  return (
    <ul className={`productsGrid grid ${gridParamsStyle} mt-10 gap-4`} >
      {
        products?.map(product => (
         product.onStock && <ProductCard product={product} />
        ))
      }
    </ul>
  )
}

export default function RenderProductList({ products, title, headerRightEl, style, gridParamsStyle, loading }: RenderProductListTypes) {

  return (
    <div className={`${style} text-blackColor2`} >
      <div className='globalMaxWidth px-4'>
        <header className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold '>{title}</h1>
          {headerRightEl}
        </header>
        <p className='mt-2'> {products?.length}  Produit{products?.length > 1 && "s"} Trouvé{products?.length > 1 && "s"}  </p>

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
