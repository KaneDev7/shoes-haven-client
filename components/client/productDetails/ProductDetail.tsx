import { Product } from '@/types/product.type'
import React from 'react'

import ImageSildes from './ImageSildes';
import ProductDetailText from './ProductDetailText';

type ProductDetailType = {
    product: Product
}

export default function ProductDetail({ product }: ProductDetailType) {

    return (
        <div className='globalMaxWidth flex flex-col gap-10 lg:flex-row mt-10 bg-white'>
            <ImageSildes product={product}/>
            <ProductDetailText product={product} />
        </div>
    )
}

