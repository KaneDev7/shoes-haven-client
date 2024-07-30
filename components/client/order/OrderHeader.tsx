import React, { useContext } from 'react'
import { OrderCardContext } from './OrderCard'
import { GoChevronDown, GoChevronUp } from 'react-icons/go'

export default function OrderHeader() {
  const {order_date, isShowContent, setIsShowContent} = useContext(OrderCardContext)

  const handleToggleShowContent = () => {
    setIsShowContent(v => !v)
  }
    return (
        <header className='w-full flex justify-between items-center border-b py-4 '>
            <div className=''>
                <h2 className='text-lg font-bold'>Commande  ID : 334902461 </h2>
                <small className='text-black/50'>Date de la command :  {new Date(order_date).toLocaleDateString()} </small>
            </div>

            {!isShowContent &&  <GoChevronDown size={25}  onClick={handleToggleShowContent}/>}
            {isShowContent &&  <GoChevronUp size={25} onClick={handleToggleShowContent} />}

        </header>
    )
}
