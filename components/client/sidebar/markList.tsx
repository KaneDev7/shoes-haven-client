"use client"
import useMarkList from '@/hooks/useMarkList'
import { toggleSelectMark } from '@/redux/domains/form/product/mark.slice'
import { setQueryParams } from '@/redux/domains/products/queryParams.slice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

type MarkListType = {
    title: string,
    colorList: string[],
}

const CheckCage = () => {
    return <div className='w-[7px] h-[7px] pointer-events-none absolute inset-0 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-blackColor2 '>

    </div>
}

export default function MarkList() {
   const {marks} = useMarkList()

    const selectMarks = useSelector(state => state.selectMarks)
    const dispatch = useDispatch()

    const handleToggleMark = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const element = event.target as HTMLLIElement
        const markCliked = element.id.trim()

        dispatch(toggleSelectMark(markCliked))

        if (selectMarks.includes(markCliked)) {
            const selectMarkUpdated = selectMarks.filter(item => item !== markCliked)
            return dispatch(setQueryParams(['mark', selectMarkUpdated.join(',')]))
        }

        const selectMarkUpdated = [...selectMarks, markCliked]
        return dispatch(setQueryParams(['mark', selectMarkUpdated.join(',')]))
    }

    return (
        <div className=''>
            <h2>MARQUES</h2>
            <ul className='flex flex-wrap gap-5 max-w-[300px] mt-5 '>
                {
                    marks.map(mark => (
                        <li
                            onClick={handleToggleMark}
                            id={mark}
                            className='flex items-center gap-2'>
                            <div className='w-[12px] h-[12px] pointer-events-none border border-blackColor2 relative'>
                                {selectMarks.includes(mark) && <CheckCage />}
                            </div>
                            <p className='pointer-events-none text-sm'>{mark}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
