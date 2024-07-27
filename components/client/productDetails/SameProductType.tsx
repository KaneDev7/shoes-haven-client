import { getSameProducts } from '@/api/products'
import { Product } from '@/types/product.type'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type SameProductTypeT = {
    currentProductId: string,
    productId: string
}
export default function SameProductType ({ currentProductId, productId }: SameProductTypeT) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => getSameProducts(productId)
    })
    const products = data as Product[]

    return <div className='flex flex-col gap-4 pb-6 border-b'>
        <h2 className='text-[18px] font-semibold'>Les couleurs disponibles</h2>
        <div className='flex gap-2 flex-wrap'>

            {
                products?.map((product) => (

                    <Link href={`/products/${product._id}`}>
                        <div className={`border border-black/50 rounded-md ${product._id === currentProductId && 'border-secondaryColor'} `} >
                            <Image
                                className={`w-[50px] h-[50px]  object-contain rounded-md `}
                                src={`/uploads/${product.uri[0]}`}
                                placeholder='blur'
                                blurDataURL='/placeholder.jpg'
                                height={200}
                                width={200} alt="" />
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>

}


