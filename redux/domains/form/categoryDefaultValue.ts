import { Category } from '@/types/category.type'
import { Product } from '@/types/product.type'
import { createSlice } from '@reduxjs/toolkit'


export const initialStateCategoryDefaultValue: Category = {
    _id: '669848d9cfd97a29e0ff915a',
    name: 'CHAUSSURES FORMELLES',
    description: "Faites une impression durable avec nos chaussures formelles, où le luxe rencontre l'innovation pour un confort inégalé",
    uri: '1721256153944.jpg',
}

export const categoryDefaultValueSlice = createSlice({
    name: 'categoryDefaultValue',
    initialState: initialStateCategoryDefaultValue,

    reducers: {
        setCategorytDefaultValue: (state, action) => {
            state = { ...action.payload }
            return state
        },
    },
})

export const { setCategorytDefaultValue } = categoryDefaultValueSlice.actions

export default categoryDefaultValueSlice.reducer