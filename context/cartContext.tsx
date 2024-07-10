

"use client"
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { User } from '@/types/user.type'
import { Cart } from '@/redux/domains/cart/cart.slice'
import { getCart } from '@/api/cart'

export const CartContext = createContext(null)

export default function LocalCartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Cart>([])
    const [cartQuantities, setCartQuantities] = useState<number>()
    const [totalPrice, setTotalPrice] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const totalItems = cart?.reduce((acc, item) => {
            return acc += item.quantity
        }, 0)
        setCartQuantities(totalItems)
    }, [cart])

    const onUpdateTotalPrice = (prix: number) => {
        setTotalPrice(v => v + prix)
    }

    const updataQuantity = (quantity: number) => {
        setCartQuantities(v => v + quantity)
    }

    const resetQuantity = () => {
        setCartQuantities(0)
    }

    useEffect(() => {
        const fetchtData = async () => {
            const session: User | any = JSON.parse(sessionStorage.getItem('session')) || null
            const cart = await getCart(session?.token)
            sessionStorage.setItem(`cart_${session?._id}`, JSON.stringify(cart?.items))
            setCart(cart?.items)
            console.log('context', cart)
            setTotalPrice(cart?.total)
            setIsLoading(false)
        }

        fetchtData()
    }, [isLoading])

    return <CartContext.Provider value={{ cart, cartQuantities, resetQuantity, totalPrice, onUpdateTotalPrice, updataQuantity}}>
        {children}
    </CartContext.Provider>

}
