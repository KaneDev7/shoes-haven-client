import { CartItem } from '@/types/user.type'
import { createSlice } from '@reduxjs/toolkit'



export type Cart = CartItem[]

const initialState: Cart = []

export const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addItem: (state, action) => {

        },

        removeItem: (state, action) => {

        },

        reset: (state, action) => {

        }
    }
})

export const { addItem, removeItem, reset } = cartSlice.actions