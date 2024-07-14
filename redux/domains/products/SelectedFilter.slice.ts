import {QueryParams } from '@/types/product.type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Filteritem = {
    type : string
    value : string
}
const initialState: Filteritem[] = []

export const selectedFilterSlice = createSlice({
  name: 'selectedFilter',
  initialState,
  reducers: {
    setSelectedFilter: (state, action: PayloadAction<Filteritem[]>) => {
      return action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedFilter } = selectedFilterSlice.actions

export default selectedFilterSlice.reducer