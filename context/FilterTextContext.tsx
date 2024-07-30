import { getCategories } from '@/api/categories'
import { getMarks } from '@/api/marks'
import { useQuery } from '@tanstack/react-query'
import React, { ReactNode, createContext, useEffect, useState } from 'react'


export const FilterTextContext = createContext(null)

export default function FilterTextProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState([])
  const [marks, setMark] = useState([])

  const { data : categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => getCategories()
  })

  const { data: markData } = useQuery({
    queryKey: ['mark'],
    queryFn: async () => getMarks()
  })

  useEffect(() => {
    if (categoryData?.length > 0) {
      setCategories(categoryData.map(category => category.name))
    }
  }, [categoryData])

  useEffect(() => {
    if(markData?.length > 0){
        setMark(markData.map(mark => mark.name) )
    }
  },[markData])

  return (
    <FilterTextContext.Provider value={{categories, marks}}>
      {children}
    </FilterTextContext.Provider>
  )
}
