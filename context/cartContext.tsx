"use client"
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { User } from '@/types/user.type'
import { Cart } from '@/redux/domains/cart/cart.slice'
import { jsxs } from 'react/jsx-runtime'
import { getUser } from '@/api/user'

export const CartContext = createContext(null)

export default function LocalCartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Cart>([])
    const [cartQuantities, setCartQuantities] = useState()
    const [isLoading, setIsLoading] = useState(true)


    const addItemToCart = (item) => {
        const session: User | any = JSON.parse(sessionStorage.getItem('session')) || null
        const currentItems = JSON.parse(sessionStorage.getItem(`cart_${session?._id}`)) || {}
        setCart([...currentItems, item])
        sessionStorage.setItem(`cart_${session?._id}`, JSON.stringify([...currentItems, item]))
    }

    useEffect(()=> {
        const totalItems = cart?.reduce((acc, item) => {
            return  acc+=item.quantity 
        },0)
        setCartQuantities(totalItems)
    },[cart])
    
    useEffect(() => {
        const fetchtData = async () =>{
            const session: User | any = JSON.parse(sessionStorage.getItem('session')) || null
            const userData = await getUser(session.token)
            sessionStorage.setItem(`cart_${userData?._id}`, JSON.stringify(userData?.cart))
            setCart(userData?.cart)
            setIsLoading(false)
        }
  
        fetchtData()
    }, [isLoading])

    return <CartContext.Provider value={{ cart, cartQuantities, addItemToCart }}>
        {children}
    </CartContext.Provider>

}
