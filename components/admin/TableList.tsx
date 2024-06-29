import React, { ReactNode } from 'react'
import ProductSkeleton from './ProductSkeleton'
import { Order, Product } from '@/types/product.type'
import ProductTableList from './ProductTableList'
import OrderTableList from './OrderTableList'

type TableListType = {
    type: string
    headerList: string[],
    data: (Product | Order | any)[]
    loading: boolean
    error: any
}

export default function TableList({ headerList, data, error, loading, type }: TableListType) {

    if (loading) {
        return <ProductSkeleton />
    }

    if (error) {
        console.log("error", error)
    }
    return (
        <div className="relative shadow-md sm:rounded-lg mt-10">

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {
                            headerList.map(item => (
                                    <th scope="col" className="px-6 py-3">
                                        {item}
                                    </th>
                            ))
                        }
                    </tr>
                </thead>
                {
                    type === 'products' ?
                        <ProductTableList products={data} /> :
                        <OrderTableList orders={data} />
                }
            </table>
        </div>
    )
}
