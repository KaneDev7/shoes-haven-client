"use client"
import useFetch from '@/hooks/useFetch'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductSkeleton from './ProductSkeleton'
import { troncText } from '@/utils/commun'

export default function ProductList() {
    const { data, error, loading } = useFetch('/products')
    if (loading) {
        return <ProductSkeleton />
    }

    if (error) {
        console.log("error", error)
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th>
                            <input type="checkbox" className='w-fit ml-2' />
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Nom du produit
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Categories
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Prix
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Stock
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {
                        data?.map(product => (
                                <tr data-popover-target="popover-product-detail" className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td>
                                        <input type="checkbox" className='w-fit ml-2' />
                                    </td>
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
                                            className="font-medium text-secondaryColor hover:underline"
                                        >
                                            Details

                                        </Link>

                                    </td>
                                </tr>
                          
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}
