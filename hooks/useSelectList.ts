"use client"

import { setSelectCategories } from '@/redux/domains/form/caregories.slice'
import { setSelectColors } from '@/redux/domains/form/colors.slice'
import React, {useState } from 'react'
import { useDispatch } from 'react-redux'

type SelectListType = {
    list: (string | number | null)[],
    name: string
}

export default function useSelectList({ list, name }: SelectListType) {
    const [selectlist, setSelectlist] = useState<(string | number | null)[]>(list)
    const dispatch = useDispatch()

    const setDataToRedux = (selectlistUpdated: (string | number | null)[]) => {
        switch (name) {
            case 'category':
                dispatch(setSelectCategories(selectlistUpdated))
                break;
            case 'color':
                dispatch(setSelectColors(selectlistUpdated))
                break;
            default:
                break;
        }
    }

    const handleToggleSelect = (selected: string | number | null) => {
        if (selectlist.includes(selected)) {
            const selectlistUpdated = selectlist.filter(item => item !== selected)
            setDataToRedux(selectlistUpdated)
            return setSelectlist(selectlistUpdated)
        }
        const selectlistUpdated = [...selectlist, selected]
        setSelectlist(selectlistUpdated)
        setDataToRedux(selectlistUpdated)
    }
    return { selectlist, handleToggleSelect }
}
