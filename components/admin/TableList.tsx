import React, { ReactNode, useState } from 'react'
import ProductSkeleton from './ProductSkeleton'
import { Order, Product } from '@/types/product.type'
import ProductTableList from './ProductTableList'
import OrderTableList from './OrderTableList'
import { deleteProduct } from '@/api/products'
import { token } from './InsertProduct'
import { useParams, useRouter } from 'next/navigation'

type TableListType = {
    type: string
    headerList: string[],
    data: (Product | Order | any)[]
    loading: boolean
    error: any
}

export default function TableList({ headerList, data, error, loading, type }: TableListType) {
    const [itemsId, setItemsId] = useState([])
    const router = useRouter()

    const checkOneItem = (id, event) => {
        if (event.target.checked) {
            setItemsId(ids => [...ids, id])
        } else {
            setItemsId(itemsId.filter(ids => ids !== id))
        }
    }

    const checkAllItems = (e) => {
        if (e.target.checked) {
            const allItemsId = data.map(item => item._id)
            setItemsId(allItemsId)
        } else {
            setItemsId([])
        }
    }

    const deleteData = async () => {
        for (const id of itemsId) {
            if (type === 'products') {
                await deleteProduct(token, id)
            }
            setItemsId([])
            router.push('/admin/products')
        }

    }

    if (loading) {
        return <ProductSkeleton />
    }

    if (error) {
        console.log("error", error)
    }
    return (
        <section className='my-10'>
            {
                itemsId.length !== 0 &&
                <div className='flex items-center gap-4 mt-10'>
                    <p className='text-sm'> {itemsId.length} item{itemsId.length > 1 && 's'} selectionné{itemsId.length > 1 && 's'}</p>
                    <button
                        onClick={deleteData}
                        className='bg-red-100 hover:bg-white border border-red-200
                                 text-red-700 font-medium py-1 px-2 text-xs rounded-sm' >
                        Supprimer
                    </button>
                </div>
            }

            <div className="relative shadow-md sm:rounded-lg mt-4">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                        <tr>
                            <td className='px-6 py-4'>
                                <input type="checkbox" onChange={checkAllItems} />
                            </td>
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
                            <ProductTableList
                                itemsId={itemsId}
                                checkOneItem={checkOneItem}
                                products={data} /> :
                            <OrderTableList
                                itemsId={itemsId}
                                checkOneItem={checkOneItem}
                                products={data}
                                orders={data} />
                    }
                </table>
            </div>
        </section>

    )
}
