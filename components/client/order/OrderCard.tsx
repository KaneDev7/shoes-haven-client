import React, { createContext, useState } from 'react'
import OrderHeader from './OrderHeader'
import OrderFooter from './OrderFooter'
import OrderContent from './OrderContent'
import { Order } from '@/types/product.type'

type OrderCardType = {
    order: Order
}

export const OrderCardContext = createContext(null)

export default function     OrderCard({ order }: OrderCardType) {
    const [isShowContent, setIsShowContent] = useState(false)
    const {
        items,
        order_date,
        status,
        payment_method,
        total_price,
        user_id,
        order_id
    } = order
    return (
            <OrderCardContext.Provider value={{
                items,
                order_date,
                status,
                payment_method,
                total_price,
                user_id,
                order_id,
                isShowContent,
                setIsShowContent,
            }}>
                <OrderHeader />
                <OrderContent />
                <OrderFooter />
            </OrderCardContext.Provider>
    )
}
