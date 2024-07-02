import { User } from '@/types/user.type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState: User = {
    _id : '',
    username : '',
    password : '',
    email : '',
    token : '',
    isNew : false
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {

    setcurrentUser: (state, action: PayloadAction<User>) => {
      state = action.payload
      return state
    },
  },
})

// Action creators are generated for each case reducer function
export const { setcurrentUser } = currentUserSlice.actions

export default currentUserSlice.reducer