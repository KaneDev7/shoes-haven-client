"use client"
import Header from '@/components/admin/Header';
import InsertProduct from '@/components/admin/InsertProduct';
import React from 'react'
import { store } from '@/redux/store/store';
import { Provider } from 'react-redux';

export default function Products() {

  return (
    <Provider store={store}>
      <div className='w-full'>
        <Header />
        <InsertProduct />
      </div>
    </Provider>

  )
}
