import { Product } from '@/types/product.type'
import { createSlice } from '@reduxjs/toolkit'


export const initialStateProductDefaultValue: Product = {
    _id: '',
    productId: '',
    title: '',
    description: '',
    category: '',
    price: null,
    onStock: false,
    size: null,
    color: '',
    mark: '',
    uri: [],
}

export const productDefaultValueSlice = createSlice({
    name: 'productDefaultValue',
    initialState : initialStateProductDefaultValue,

    reducers: {
        setProductDefaultValue: (state, action) => {
            state = {...action.payload}
            return state
        },  
    },
})

// Action creators are generated for each case reducer function
export const {setProductDefaultValue} = productDefaultValueSlice.actions

export default productDefaultValueSlice.reducer