import { connectDB } from '@/lib/config/connectDB'
import Link from 'next/link'
import React from 'react'

const page = () => {

  connectDB()
  
 
      return (
    <div className='flex flex-col items-center justify-center h-screen gap-3'>
      
    
       <h1 className='text-4xl text-blue-500'>Welcome to Kawou </h1>

          <p  className='text-3xl    border-2 p-2  rounded-2xl  '> <Link href={'/login'}>  Se connecter   </Link> </p>

    </div>
  )
}

export default page
