"use client"
import { getMarks } from '@/api/marks'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export default function useMarkList() {
    const [marks, setMark] = useState([])

    const { data } = useQuery({
        queryKey: ['mark'],
        queryFn: async () => getMarks()
      })

      useEffect(() => {
        if(data?.length > 0){
            setMark(data.map(mark => mark.name) )
        }
      },[data])

  return {marks}
}
