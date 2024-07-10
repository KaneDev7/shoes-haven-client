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
  },
})

// Action creators are generated for each case reducer function
export const {setSelectSize  } = selectSizesSlice.actions

export default selectSizesSlice.reducer