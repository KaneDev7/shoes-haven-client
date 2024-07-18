import { configureStore } from '@reduxjs/toolkit'
import { selectCategoriesSlice } from '../domains/form/caregories.slice'
import { selectColorsSlice } from '../domains/form/colors.slice'
import { selectValidationSlice } from '../domains/form/SelectValidation.slice'
import { filesSlice } from '../domains/form/file.slice'
import { productDefaultValueSlice } from '../domains/form/productDefaultValue'
import { isProducUpdateSlice } from '../domains/form/isProducUpdate'
import { currentUserSlice } from '../domains/users/currentUser.slice'
import { cartSlice } from '../domains/cart/cart.slice'
import { selectSizesSlice } from '../domains/form/size.slice'
import { queryParamsSlice } from '../domains/products/queryParams.slice'
import { selectedFilterSlice } from '../domains/products/SelectedFilter.slice'
import { categoryDefaultValueSlice } from '../domains/form/categoryDefaultValue'
import { isCategoryUpdateSlice } from '../domains/form/isCategoryUpdate'

export const store = configureStore({
  reducer: {
    selectCategories : selectCategoriesSlice.reducer,
    selectColors : selectColorsSlice.reducer,
    selectSizes : selectSizesSlice.reducer,
    selectValidation : selectValidationSlice.reducer,
    files : filesSlice.reducer,
    productDefaultValue: productDefaultValueSlice.reducer,
    categoryDefaultValue : categoryDefaultValueSlice.reducer,
    isProducUpdate : isProducUpdateSlice.reducer,
    isCategoryUpdate : isCategoryUpdateSlice.reducer,
    currentUser : currentUserSlice.reducer,
    cart : cartSlice.reducer,
    queryParams: queryParamsSlice.reducer,
    selectedFilter : selectedFilterSlice.reducer
     
  },
})

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch