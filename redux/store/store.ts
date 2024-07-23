import { configureStore } from '@reduxjs/toolkit'
import { selectCategoriesSlice } from '../domains/form/category/categories.slice'
import { selectColorsSlice } from '../domains/form/product/colors.slice'
import { filesSlice } from '../domains/form/file.slice'
import { productDefaultValueSlice } from '../domains/form/product/productDefaultValue'
import { isProducUpdateSlice } from '../domains/form/product/isProducUpdate'
import { currentUserSlice } from '../domains/users/currentUser.slice'
import { cartSlice } from '../domains/cart/cart.slice'
import { selectSizesSlice } from '../domains/form/product/size.slice'
import { queryParamsSlice } from '../domains/products/queryParams.slice'
import { selectedFilterSlice } from '../domains/products/SelectedFilter.slice'
import { categoryDefaultValueSlice } from '../domains/form/category/categoryDefaultValue'
import { isCategoryUpdateSlice } from '../domains/form/category/isCategoryUpdate'
import { markDefaultValueSlice } from '../domains/form/mark/markDefaultValue'
import { selectMarkSlice } from '../domains/form/product/mark.slice'

export const store = configureStore({
  reducer: {
    selectCategories : selectCategoriesSlice.reducer,
    selectColors : selectColorsSlice.reducer,
    selectSizes : selectSizesSlice.reducer,
    selectMarks : selectMarkSlice.reducer,
    files : filesSlice.reducer,
    productDefaultValue: productDefaultValueSlice.reducer,
    categoryDefaultValue : categoryDefaultValueSlice.reducer,
    markDefaultValue : markDefaultValueSlice.reducer,
    isProducUpdate : isProducUpdateSlice.reducer,
    isCategoryUpdate : isCategoryUpdateSlice.reducer,
    currentUser : currentUserSlice.reducer,
    cart : cartSlice.reducer,
    queryParams: queryParamsSlice.reducer,
    selectedFilter : selectedFilterSlice.reducer
     
  },
})
