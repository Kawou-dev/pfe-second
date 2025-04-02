"use client"
import React, { useEffect, useState } from 'react'
import { CiStar } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Tasks = () => {
    const [todos, setTodos] = useState([]) ; 

    const fetchTodo = async () =>{
        try {
            const res = await fetch("/api/todo") ; 
            const data = await res.json() ;
            console.log(data) ; 
            if(data.error){
                alert("Error" ,  data.error) ; 
            } 
             setTodos(data.todos)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        fetchTodo()
    }, [])



  return (
    <div className='flex flex-wrap gap-4 md:ml-3 ml-5      '>
         
                {todos.map((todo, index) => (
                        <div key={index} className='h-[14rem] px-4 py-3 flex flex-col gap-4 shadow-md w-[280px] bg-white rounded-lg mt-6   '>
                        <div>
                            <h4 className='font-semibold text-2xl'>{todo.title} </h4>
                                <p>{todo.description}</p>
                            </div>
                        <div className='mt-auto flex items-center justify-between   '>
                            <p className='text-sm text-gray-400'>12/06/2020</p>
                            <p>High</p>
                            <div>
                                <div className='flex items-center gap-3 text-[1.2rem] '>
                                    <button className='cursor-pointer'><CiStar /></button>
                                    <button className='text-[#00A1F1] cursor-pointer '><FaEdit /></button>
                                    <button className='text-[#F65314] cursor-pointer '><MdDelete /></button>
                                </div>
                            </div>
                        </div>
                   </div>
                ))}
         
           <button className='h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-md w-[300px] rounded-lg mt-6 border-2 border-dashed border-gray-400  
            hover:bg-gray-300 hover:border-none duration-200 ease-in-out '>
                   <h1>Add Task</h1>
           </button>
    </div>
  )
}

export default Tasks
