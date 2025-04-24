import Todo from '@/app/sections/Todo'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const page = () => {



  return (
    <div className='  w-[90%] mx-auto    '>
         <h1 className='text-2xl font-bold pl-4'> All your Todo</h1>
           <Todo />
           <Toaster />

    </div>
  )
}

export default page
