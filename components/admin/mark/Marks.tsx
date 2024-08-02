import React from 'react'
import Spiner from '@/components/shared/Spiner'
import { Mark } from '@/types/mark'
import MarkCard from '../form/mark/MarkCard'


type MarksType = {
    marks: Mark[]
    isLoading: boolean
    isFetching: boolean
}
export default function Marks({marks , isLoading, isFetching }: MarksType) {
    if (!isLoading)
        return (
          <div>
            <h2 className='text-2xl font-bold text-blackColor2 pb-10'>Liste  des marques</h2>
              <ul className='flex gap-5 flex-wrap relative  '>
                {isFetching || isLoading && <Spiner />}
                {
                    marks.map(mark => (
                    <MarkCard mark={mark} key={mark._id}/>
                    ))
                }
            </ul>
          </div>
        )
}
