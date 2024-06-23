import { configureStore } from '@reduxjs/toolkit'
import { selectCategoriesSlice } from '../domains/form/caregories.slice'
import { selectColorsSlice } from '../domains/form/colors.slice'
import { selectValidationSlice } from '../domains/form/SelectValidation.slice'
import { filesSlice } from '../domains/form/file.slice'

export const store = configureStore({
  reducer: {
    selectCategories : selectCategoriesSlice.reducer,
    selectColors : selectColorsSlice.reducer,
    selectValidation : selectValidationSlice.reducer,
    files : filesSlice.reducer
  },
})

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch