import { BASE_URL, COLOR_KEY, MARK_KEY, SIZE_KEY } from "@/constants/data";
import { toggleSelectColor } from "@/redux/domains/form/product/colors.slice";
import { toggleSelectMark } from "@/redux/domains/form/product/mark.slice";
import { SelectType, toggleSelectSize } from "@/redux/domains/form/product/size.slice";
import { setQueryParams } from "@/redux/domains/products/queryParams.slice";
import { store } from "@/redux/store/store";
import { QueryParams } from "@/types/product.type";
import { Dispatch } from "@reduxjs/toolkit";

export const troncText = (text: string, length: number) => {
    if (text.length > length) {
        return text.substring(0, length) + '...'
    }
    return text
}

export const createUrlParams = (queryObject: { [key: string]: string }) => {
    let url = new URL(BASE_URL);
    let params = new URLSearchParams(url.search);
    for (const [key, value] of Object.entries(queryObject)) {
        params.append(key, value)
    }
    return params.toString()
}

export const isObjEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
}


export const selectedFilterFn = (queryParams: QueryParams) => {
    const selectColors = store.getState().selectColors
    const selectSizes = store.getState().selectSizes
    const selectMarks = store.getState().selectMarks

    let querySelected = []

    if (queryParams.color) {
        querySelected.push({
            type: COLOR_KEY,
            value: selectColors
        })
    }
    if (queryParams.size) {
        querySelected.push({
            type: SIZE_KEY,
            value: selectSizes
        })
    }
    if (queryParams.mark) {
        querySelected.push({
            type: MARK_KEY,
            value: selectMarks
        })
    }
    return querySelected
}


export const getSpacificSelectFilter = (key: string): any[] => {
    switch (key) {
        case COLOR_KEY:
            return store.getState().selectColors
        case SIZE_KEY:
            return store.getState().selectSizes
        case MARK_KEY:
            return store.getState().selectMarks
        default:
            return [];
    }
}

export const dispatchQueryParams = (key: string, value: SelectType) => {
    const dispatch: Dispatch = store.dispatch
    const selectFilter: any[] = getSpacificSelectFilter(key)

    if (!selectFilter.includes(value)) {
        const selectFilterUpdated = selectFilter.filter(item => item !== value)
        return dispatch(setQueryParams([key, selectFilterUpdated.join(',')]))
    }
    const selectFilterUpdated = [...selectFilter, value]
    return dispatch(setQueryParams([key, selectFilterUpdated.join(',')]))
}


export const dispatchToggleSelect = (key: string, value: SelectType) => {
    const dispatch: Dispatch = store.dispatch
    switch (key) {
        case COLOR_KEY:
            dispatch(toggleSelectColor(value))
            break
        case SIZE_KEY:
            dispatch(toggleSelectSize(value))
            break
        case MARK_KEY:
            dispatch(toggleSelectMark(value))
            break
        default:
            return [];
    }
}