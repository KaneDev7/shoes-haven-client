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

        toggleSelectColor: (state, action: PayloadAction<SelectType>) => {
            if (state.includes(action.payload)) {
                const selectLisColortUpdated = state.filter(item => item !== action.payload)                
                state =  [...selectLisColortUpdated]
            }else{
                const selectLisColortUpdated = [...state, action.payload]
                state =  [...selectLisColortUpdated]
            }
            return state 
        }
    },

})

// Action creators are generated for each case reducer function
export const { setSelectColors, toggleSelectColor  } = selectColorsSlice.actions

export default selectColorsSlice.reducer