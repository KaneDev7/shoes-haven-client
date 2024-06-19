"use client"

import React, { useState } from 'react'

export default function useSelectList({ list } : {list : (string | number | null) []} ) {
    const [selectlist, setSelectlist] = useState<(string | number | null) []>(list)

    const handleToggleSelect = (selected : string | number | null) => {
        if (selectlist.includes(selected)) {
            return setSelectlist(prevSelectList => prevSelectList.filter(item => item !== selected))
        }
        setSelectlist(prevSelectList => [...prevSelectList, selected])
    }
    return { selectlist, handleToggleSelect}
}
