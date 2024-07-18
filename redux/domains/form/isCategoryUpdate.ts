import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState: boolean = false

export const isCategoryUpdateSlice = createSlice({
    name: 'isCategoryUpdate',
    initialState,

    reducers: {
        setIsCategoryUpdate: (state, action: PayloadAction<boolean>) => {
            state = action.payload
            return state
        },
    },
})

// Action creators are generated for each case reducer function
export const { setIsCategoryUpdate } = isCategoryUpdateSlice.actions

export default isCategoryUpdateSlice.reducer