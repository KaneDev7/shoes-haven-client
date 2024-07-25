"use client"
import Modal from '@/components/client/modal/modal'
import EditUserInfos from '@/components/client/profile/EditUserInfos'
import ProfileNav from '@/components/client/profile/ProfileNav'
import Button from '@/components/client/shared/buttons'
import React, { useState } from 'react'
import { FaUserLarge } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

export default function Profile() {
  const currentUser = useSelector(state => state.currentUser)
  const [showModal, setShowModal] = useState(false)

  const hadleEditUserInfos = () => {
    setShowModal(true)
  }

  return (
    <div className='globalMaxWidth mt-20 bg-white '>
      <h1 className='font-bold text-2xl'>Mon compte </h1>
      <ProfileNav />
      <div className='flex  md:flex-row flex-col gap-4  md:gap-20'>

        <div className=' flex flex-col items-center justify-center gap-4'>
          <div className='w-[100px] h-[100px] p-4 flex justify-center items-center bg-gray-100 rounded-full '>
            <FaUserLarge size={40} />
          </div>
          <p className='text-lg font-semibold'> {currentUser.username} </p>
        </div>

        <div className=' flex flex-col  gap-4 mt-5 '>

          <div className='flex text-sm items-center gap-4'>
            <h2 className='font-semibold'> Email: </h2>
            <p className='opacity-90'>{currentUser.email}</p>
          </div>

          <div className='flex text-sm items-center gap-4'>
            <h2 className='font-semibold'> ville : </h2>
            <p className='opacity-90'>{currentUser?.address?.city}</p>
          </div>

          <div className='flex text-sm items-center gap-4'>
            <h2 className='font-semibold'> Quartier : </h2>
            <p className='opacity-90'>{currentUser?.address?.street}</p>
          </div>

          <div className='flex text-sm items-center gap-4'>
            <h2 className='font-semibold'> Téléphone : </h2>
            <p className='opacity-90'>{currentUser?.phoneNum}</p>
          </div>
        </div>

      </div>
      <div className='w-full flex justify-start md:justify-end items-center mt-20'>
        <div className='flex items-center gap-4'>
          <Button
            handleClick={hadleEditUserInfos}
            text='Modifier mes information'
            style='border-2 bg-secondaryColor p-2 rounded-md text-xs opacity-90 hover:opacity-100'
          />

          <Button
            text='Se déconnecter'
            style='text-blackColor2 border-2 border-gray-100 hover:border-gray-200 p-2 rounded-md text-xs '
          />
        </div>
      </div>
      {
        showModal &&
        <Modal
          isShowModal={showModal}
          setIsShowModal={setShowModal}
          title='Modification des informations'>
          <div className=' bg-white '>
            <EditUserInfos />
          </div>
        </Modal>
      }
    </div>
  )
}
