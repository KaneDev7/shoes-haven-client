"use client"
import { setSelectCategories } from '@/redux/domains/form/category/categories.slice'
import { setSelectColors } from '@/redux/domains/form/product/colors.slice'
import { setSelectSize } from '@/redux/domains/form/product/size.slice'
import { setQueryParams } from '@/redux/domains/products/queryParams.slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

type SelectListType = {
    list: (string | number | null)[],
    name?: string,
    isClient?: boolean
}

export default function useSelectList({ list, name, isClient }: SelectListType) {
    const [selectlist, setSelectlist] = useState<(string | number | null)[]>(list)
    const dispatch = useDispatch()

    const setDataToRedux = (selectlistUpdated: (string | number | null)[], type : string | undefined = name) => {
        switch (type) {
            case 'category':
                dispatch(setSelectCategories(selectlistUpdated))
                if (isClient) dispatch(setQueryParams(['category', selectlistUpdated.join(',')]))
                break;
            case 'color':
                dispatch(setSelectColors(selectlistUpdated))
                if (isClient) dispatch(setQueryParams(['color', selectlistUpdated.join(',')]))
                break;
            case 'size':
                dispatch(setSelectSize(selectlistUpdated))
                if (isClient) dispatch(setQueryParams(['size', selectlistUpdated.join(',')]))
                break;
            default:
                break;
        }
    }

    const handleToggleSelect = (selected: string | number | null, type? : string | undefined ) => {
       
        if (selectlist.includes(selected)) {
            const selectlistUpdated = selectlist.filter(item => item !== selected)
            setDataToRedux(selectlistUpdated, type)
            return setSelectlist(selectlistUpdated)
        }

        const selectlistUpdated = [...selectlist,selected]
        setSelectlist(selectlistUpdated)
        setDataToRedux(selectlistUpdated, type)
    }
    return { selectlist, handleToggleSelect }
}
