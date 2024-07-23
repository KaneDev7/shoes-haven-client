import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type SelectType = (string | number | null)[]

const initialState: SelectType = []

export const selectMarkSlice = createSlice({
    name: 'selectMarks',
    initialState,

    reducers: {
        setSelectMark: (state, action: PayloadAction<SelectType>) => {
            state = action.payload
            return state
        },

        toggleSelectMark: (state, action: PayloadAction<SelectType>) => {
            if (state.includes(action.payload)) {
                const selectLisMarkUpdated = state.filter(item => item !== action.payload)                
                state =  [...selectLisMarkUpdated]
            }else{
                const selectLisMarkUpdated = [...state, action.payload]
                state =  [...selectLisMarkUpdated]
            }
            return state 
        }
    },

})

// Action creators are generated for each case reducer function
export const { setSelectMark, toggleSelectMark  } = selectMarkSlice.actions

export default selectMarkSlice.reducer