import { Product } from '@/types/product.type'
import { troncText } from '@/utils/commun'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ProductTableList({ products }: { products: Product[] }) {
    return (
        <>
            <tbody>

                {
                    products?.map(product => (
                        <tr data-popover-target="popover-product-detail" className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className=' flex gap-5 items-center w-[200px] '>
                                    <Image
                                        src={`/uploads/${product.uri[0]}`}
                                        height={100}
                                        width={100}
                                        alt=""
                                        className='w-[35px] h-[35px] object-cover' />
                                    <p> {product.title} </p>
                                </div>

                            </td>
                            <td className="px-6 py-4 capitalize line-clamp-6"> {troncText(product?.category, 30)} </td>
                            <td className="px-6 py-4 capitalize"> {product?.price} FCFA </td>
                            <td className="px-6 py-4 capitalize"> {product?.onStock ? 'Oui' : 'Non'} </td>

                            <td className="px-6 py-4">
                                <Link
                                    href={`/admin/products/${product._id}`}
                                    className="font-semibold text-secondaryColor hover:underline"
                                >
                                    Details

                                </Link>

                            </td>
                        </tr>
                    ))
                }
            </tbody>

        </>
    )
}

