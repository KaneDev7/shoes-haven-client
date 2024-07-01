import { Product } from '@/types/product.type'
import { troncText } from '@/utils/commun'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type ProductListTableType = { 
    products: Product[],
    checkOneItem : () => {id : string, event :any}
    itemsId : string[]
}

export default function ProductTableList({ products , itemsId, checkOneItem}: ProductListTableType) {
    return (
        <>
            <tbody>

                {
                    products?.map(product => (
                        <tr data-popover-target="popover-product-detail" className={` ${itemsId.includes(product._id) ? 'bg-gray-50' : 'bg-white'} border-b  hover:bg-gray-50`} >
                            <td className='px-6 py-4'>
                                <input type="checkbox" checked={itemsId.includes(product._id)} onChange={(event) => checkOneItem(product._id, event)}/>
                            
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

