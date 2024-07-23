import {QueryParams } from '@/types/product.type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: QueryParams = {}

export const queryParamsSlice = createSlice({
  name: 'queryParams',
  initialState,
  reducers: {
    setQueryParams: (state, action: PayloadAction<string[]>) => {
      if(action.payload[0] && !action.payload[1]){
        delete  state[action.payload[0]]
      }else{
        state = state[action.payload[0]] = action.payload[1]
      }
    },

    initQueryParams : (state) => {
      state = {category : state.category}       
      return state
    }
    
  },

})

// Action creators are generated for each case reducer function
export const { setQueryParams, initQueryParams } = queryParamsSlice.actions

export default queryParamsSlice.reducer