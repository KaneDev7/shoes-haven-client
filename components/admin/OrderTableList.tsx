import { Order, Status } from '@/types/product.type'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { Dropdown } from './DropDown'



type OrderListTableType = {
    orders: Order[]
    checkOneItem: () => { id: string, event: any }
    itemsId: string[]
}

type OrderTableRowType = {
    order: Order
    checkOneItem: () => { id: string, event: any }
    itemsId: string[]

}

const OrderStatus = ({ status }: { status: Status, }) => {
    const statusColor = status === 'deliveried' ? 'text-[#078549]' : status === 'pendding' ? 'text-blackColor2' : 'text-[#F83E3E]'
    const statusBg = status === 'deliveried' ? 'bg-[#e9faef]' : status === 'pendding' ? 'bg-[#fff9c6]' : 'bg-[#ffe3e3]'
    const statusText = status === 'deliveried' ? 'Livré' : status === 'pendding' ? 'En cours' : 'Annulé'
    return <p className={`py-1 px-3 text-center text-nowrap text-xs rounded-md ${statusColor} ${statusBg}`} > {statusText} </p>
}


const OrderTableRow = ({ checkOneItem, itemsId, order }: OrderTableRowType) => {
    const [status, setStatus] = useState<Status>(order.status)

    const onStatusChange = (value: Status) => {
        setStatus(value)
    }

    return <tr data-popover-target="popover-order-detail" className={` ${itemsId.includes(order._id) ? 'bg-gray-50' : 'bg-white'} border-b  hover:bg-gray-50`}>
        <td className='px-6 py-4'>
            <input type="checkbox" checked={itemsId.includes(order._id)} onChange={(event) => checkOneItem(order._id, event)} />
        </td>
        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <div className=' flex gap-5 items-center w-[200px] '>
                <div>
                    <FaUserCircle size={30} opacity={.7} />
                </div>
                <div>
                    <p className='text-sm font-bold'> {order.username} </p>
                    <p className='text-xs opacity-60'> {order.email} </p>
                </div>
            </div>
        </td>
        <td className="px-6 py-4 capitalize "> {new Date(order?.order_date).toLocaleDateString()}</td>
        <td className="px-6 py-4 capitalize "> {order.items.length} </td>
        <td className="px-6 py-4 capitalize "> {order.total_price} </td>
        <td className="px-6 py-4 capitalize "> {order.payment_method} </td>
        <td className="px-6 py-4  ">
            <div className='flex items-center  gap-2'>
                <OrderStatus
                    status={status} />
                <Dropdown
                    orderId={order._id}
                    status={order.status}
                    onStatusChange={onStatusChange}
                />
            </div>
        </td>

        <td className="px-6 py-4">
            <Link
                href={`/admin/orders/${order._id}`}
                className="font-semibold text-secondaryColor hover:underline"
            >
                Details
            </Link>

        </td>
    </tr>
}

export default function OrderTableList({ orders, itemsId, checkOneItem }: OrderListTableType) {
    return (
        <>
            <tbody className='w-full'>
                {
                    orders?.map(order => (
                        <OrderTableRow
                            order={order}
                            itemsId={itemsId}
                            checkOneItem={checkOneItem} />
                    ))
                }
            </tbody>

        </>
    )
}

