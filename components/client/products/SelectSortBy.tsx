"use client"
import { SORT_PRICE } from '@/constants/data'
import { setQueryParams } from '@/redux/domains/products/queryParams.slice'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function SelectSortBy() {
    const dispatch = useDispatch()

    const handleSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        dispatch(setQueryParams([SORT_PRICE, value]))
    }

    return (
        <select onChange={handleSortBy} className='p-2 text-sm'>
            <option selected hidden value="">Tirer par</option>
            <option value="asc">Prix inferieur</option>
            <option value="desc">Pris superieur</option>
        </select>
    )
}
