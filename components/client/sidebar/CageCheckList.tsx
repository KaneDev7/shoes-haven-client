import React from 'react'



type CageCheckListType = {
  title: string
  handleToggleCheck: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void,
  list: (string | number) [],
  selectData: string[]
}

const CheckCage = () => {
  return <div className='w-[7px] h-[7px] pointer-events-none absolute inset-0 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-blackColor2 '></div>
}

export default function CageCheckList({ title, list, selectData, handleToggleCheck }: CageCheckListType) {
  return (
    <div>
      <div>
        <h2>{title}</h2>
        <ul className='flex flex-wrap gap-5  mt-5 '>
          {
            list.map(item => (
              <li
                key={item}
                onClick={handleToggleCheck}
                id={item}
                className='flex items-center gap-2'>
                <div className='w-[12px] h-[12px] pointer-events-none border border-blackColor2 relative'>
                  {selectData.includes(item) && <CheckCage />}
                </div>
                <p className='pointer-events-none text-sm'>{item}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
