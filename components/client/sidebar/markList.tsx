"use client"
import { MARK_KEY, SIZES_DATA } from '@/constants/data'
import useMarkList from '@/hooks/useMarkList'
import { toggleSelectMark } from '@/redux/domains/form/product/mark.slice'
import { dispatchQueryParams } from '@/utils/commun'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CageCheckList from './CageCheckList'

export default function MarkList() {
    const selectMarks = useSelector(state => state.selectMarks)
    const { marks } = useMarkList()
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
