import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type SelectType = (string | number | null)[]

const initialState: SelectType = []

export const selectColorsSlice = createSlice({
    name: 'selectColors',
    initialState,

    reducers: {
        setSelectColors: (state, action: PayloadAction<SelectType>) => {
            state = action.payload
            return state
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSelectColors } = selectColorsSlice.actions

export default selectColorsSlice.reducer