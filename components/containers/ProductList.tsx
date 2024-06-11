import React from 'react'
import Button from '../buttons'
import { Product } from '@/types/product.type'
import ProductCard from '../ProductCard'

type Productsypes = {
    products: Array<Product>
}
export default function Productlist({products}: Productsypes){
  return (
    <div>
      <div className='globalMaxWidth mt-20 px-4'>
        <header className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>NOS CHAUSSURES</h1>
            <Button text='Voir plus' style='bg-black text-white py-2 px-10 rounded-full' />
        </header>

        <ul className='productsGrid grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-10 gap-4'>
            {
                products.map(product => (
                    <ProductCard product={product}/>
                ))
            }
        </ul>
      </div>
    </div>
  )
}
