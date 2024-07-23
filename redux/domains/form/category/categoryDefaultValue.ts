import { Category } from '@/types/category.type'
import { createSlice } from '@reduxjs/toolkit'


export const initialStateCategoryDefaultValue: Category = {
    _id: '',
    name: '',
    description: "",
    uri: '',
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