import React from 'react'
import Button from '../buttons'
import { Product } from '@/types/product.type'
import ProductCard from '../ProductCard'

type Productsypes = {
  products: Array<Product>,
  component: React.ReactNode,
  title: string,
  style?: string,
  gridParamsStyle: string
}
export default function Productlist({ products, title, component, style, gridParamsStyle }: Productsypes) {
  return (
    <div className={`${style}`} >
      <div className='globalMaxWidth px-4'>
        <header className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>{title}</h1>
          {component}
        </header>

        <ul className={`productsGrid grid ${gridParamsStyle} mt-10 gap-4`} >
          {
            products.map(product => (
              <ProductCard product={product} />
            ))
          }
        </ul>
      </div>
    </div>
  )
}
