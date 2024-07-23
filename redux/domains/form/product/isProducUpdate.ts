import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState: boolean = false

export const isProducUpdateSlice = createSlice({
    name: 'isProducUpdate',
    initialState,

    reducers: {
        setIsProducUpdate: (state, action: PayloadAction<boolean>) => {
            state = action.payload
            return state
        },
    },
})

// Action creators are generated for each case reducer function
export const { setIsProducUpdate } = isProducUpdateSlice.actions

export default isProducUpdateSlice.reducer