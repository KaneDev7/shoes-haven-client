import { Mark } from '@/types/mark'
import { createSlice } from '@reduxjs/toolkit'


export const initialStateMarkDefaultValue: Mark = {
    _id: '',
    name: '',
    uri: '',
}

export const markDefaultValueSlice = createSlice({
    name: 'markDefaultValue',
    initialState: initialStateMarkDefaultValue,

    reducers: {
        setMarkDefaultValue: (state, action) => {
            state = { ...action.payload }
            return state
        },
    },
})

export const { setMarkDefaultValue  } = markDefaultValueSlice.actions
export default markDefaultValueSlice.reducer