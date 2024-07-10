import {QueryParams } from '@/types/product.type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState: QueryParams = {}

export const queryParamsSlice = createSlice({
  name: 'queryParams',
  initialState,
  reducers: {
    setQueryParams: (state, action: PayloadAction<string[]>) => {
      state = state[action.payload[0]] = action.payload[1]
    },
  },
})

// Action creators are generated for each case reducer function
export const { setQueryParams } = queryParamsSlice.actions

export default queryParamsSlice.reducer