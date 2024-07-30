"use client"
import { MARK_KEY } from '@/constants/data'
import { toggleSelectMark } from '@/redux/domains/form/product/mark.slice'
import { dispatchQueryParams } from '@/utils/commun'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CageCheckList from './CageCheckList'
import { FilterTextContext } from '@/context/FilterTextContext'

export default function MarkList() {
    const selectMarks = useSelector(state => state.selectMarks)
    const { marks } = useContext(FilterTextContext)

    const dispatch = useDispatch()

    const handleToggleMark = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const element = event.target as HTMLLIElement
        const markCliked = element.id.trim()
        dispatch(toggleSelectMark(markCliked))
        dispatchQueryParams(MARK_KEY, markCliked)
    }

    return (
        <CageCheckList
            title='MARQUES'
            list={marks}
            selectData={selectMarks}
            handleToggleCheck={handleToggleMark}
        />
    )
}
