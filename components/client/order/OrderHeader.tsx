import React, { useContext } from 'react'
import { OrderCardContext } from './OrderCard'
import { GoChevronDown, GoChevronUp } from 'react-icons/go'
import { usePathname } from 'next/navigation'

export default function OrderHeader() {
  const {order_date, isShowContent, setIsShowContent , order_id} = useContext(OrderCardContext)
  const pathname = usePathname()
  const isAdminPage = pathname.includes('/admin')
  
  const handleToggleShowContent = () => {
    setIsShowContent(v => !v)
  }
    return (
        <header className='w-full flex justify-between items-center border-b py-4 '>
            <div className=''>
                <h2 className='text-lg font-bold'>Commande  ID : {order_id ? order_id : '334902461'} </h2>
                <small className='text-black/50'>Date de la command :  {new Date(order_date).toLocaleDateString()} </small>
            </div>
            
            {!isShowContent && !isAdminPage &&  <GoChevronDown size={25}  onClick={handleToggleShowContent}/>}
            {isShowContent && !isAdminPage &&  <GoChevronUp size={25} onClick={handleToggleShowContent} />}

        </header>
    )
}
