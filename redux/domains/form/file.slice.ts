import { createSlice } from '@reduxjs/toolkit'


export type FileType = {
    lastModified: number,
    name : string,
    size : number
    type: string,
    webkitRelativePath: string
}

const initialState: FileType[] = []

export const filesSlice = createSlice({
    name: 'files',
    initialState,

    reducers: {
        setFiles: (state, action): FileType[] => {
            console.log('state', state)
            console.log('action', action.payload)
            state = [...state, action.payload]
            return state
        },

        deleteFile: (state, action) => {
            state = state.filter(item => item?.name !== action.payload)
            return state
        }
    },
}) 

// Action creators are generated for each case reducer function
export const { setFiles, deleteFile } = filesSlice.actions

export default filesSlice.reducer