import React from 'react'
import PopOver from './PopOver'

type UserInfosType = {
    isMonseInLink : boolean 
  }

export default function UserInfos({isMonseInLink}: UserInfosType) {
    return (
        <PopOver isMonseInLink={isMonseInLink} style='rigth' >
            <div className='w-[200px] h-[300px] bg-white shadow-md  rounded-md  '>

            </div>
        </PopOver>
    )
}
