import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type SelectType = (string | number | null) [] 

const initialState:  SelectType= []

export const selectCategoriesSlice = createSlice({
  name: 'selectCategories',
  initialState,
  reducers: {

    setSelectCategories: (state, action: PayloadAction<SelectType>) => {
      state = action.payload
      return state
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSelectCategories } = selectCategoriesSlice.actions

export default selectCategoriesSlice.reducer