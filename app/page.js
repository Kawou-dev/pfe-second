import Link from 'next/link'
import React from 'react'
import SimplePDF from './components/PDF'
import Clone from './components/DeepSeek'


const page = () => {


  
 
      return (
    <div className='flex flex-col items-center justify-center h-screen gap-3'>
      
    
        {/* <h1 className='text-4xl text-blue-500'>Welcome to Kawou </h1>
         <p  className='text-3xl    border-2 p-2  rounded-2xl  '> <Link href={'/login'}>  Se connecter   </Link> </p>
        
 */}

            {/* <SimplePDF   /> */}

            <Clone />

    </div>  
  )
}

export default page
