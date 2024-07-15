import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type SelectType = (string | number | null) [] 

const initialState:  SelectType = []

export const selectSizesSlice = createSlice({
  name: 'selectSizes',
  initialState,
  reducers: {

    setSelectSize: (state, action: PayloadAction<SelectType>) => {
      state = action.payload
      return state
    },

    toggleSelectSize: (state, action: PayloadAction<SelectType>) => {
      if (state.includes(action.payload)) {
          const selectListSizeUpdated = state.filter(item => item !== action.payload)                
          state =  [...selectListSizeUpdated]
      }else{
          const selectListSizeUpdated = [...state, action.payload]
          state =  [...selectListSizeUpdated]
      }
      return state 
  }
  },
})

// Action creators are generated for each case reducer function
export const {setSelectSize, toggleSelectSize  } = selectSizesSlice.actions

export default selectSizesSlice.reducer