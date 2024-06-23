import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


 type SelectListElementState = {
    size: boolean,
    mark: boolean,
    color: boolean,
    category: boolean
}


type SelectValidation = {
    isSelectListEmpty : SelectListElementState,
    isFirstSelect : SelectListElementState
}


const initialState: SelectValidation = {
    isSelectListEmpty :  {
        size: true,
        mark: true,
        color: true,
        category: true
    },
    isFirstSelect : {
        size: false,
        mark: false,
        color: false,
        category: false
    }

}

export const selectValidationSlice = createSlice({
    name: 'selectValidation',
    initialState,

    reducers: {
        setIsFirstSelect : (state, action) => {
            state = {
                isSelectListEmpty : state.isSelectListEmpty,
                isFirstSelect : {
                    ...state.isFirstSelect,
                    [action.payload.key]:  action.payload.value
                }
            }
            return state
        },

        setIsSelectListEmpty : (state, action) => {
            state = {
                isSelectListEmpty : {
                    ...state.isSelectListEmpty,
                    [action.payload.key]:  action.payload.value
                },
                isFirstSelect : state.isFirstSelect,
            }
            return state
        }
    },
})


// Action creators are generated for each case reducer function
export const { setIsFirstSelect, setIsSelectListEmpty } = selectValidationSlice.actions

export default selectValidationSlice.reducer