import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useTodo = () => {
    const [urgs, setUrgs] = useState([]) ; 
    const  [loadingTodo , setLoadingTodo] = useState(false) ;

    const fetchUrgTodo = async() => {
                 setLoadingTodo(true) ; 
                try {
                     const res = await fetch("/api/urgentTodo") ; 
                    const data = await res.json() ; 
                    if(!res.ok) throw new Error(data.message) ;
                    setUrgs(data.urgsTodo); 
                } catch (error) {
                    toast.error(error.message) ; 
                    console.log(error.message) ; 
                }finally{
                    setLoadingTodo(false) ; 
                }
    }

    return {fetchUrgTodo , urgs} ;
       
}

export default useTodo
