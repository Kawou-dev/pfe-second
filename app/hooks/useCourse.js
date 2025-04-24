import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useCourse = () => {
      
    const [courses, setCourses] = useState([]) ; 
    const [loading , setLoading] = useState(false) ; 

    const fetchCourse = async() =>{
        setLoading(true)
        try {
              const res = await fetch("/api/course") ; 
              const data = await res.json() ; 
              if(!res.ok){
                throw new Error(data.message) ; 
              }
              setCourses(data.courses)
        } catch (error) {
            toast.error(error.message) ; 
            console.log("Error getting course") ; 
        }finally{
            setLoading(false) ; 
        }
    }


    const addCourse = async({title , notes}) => {
        const success = handleInputsError({title , notes})
        if(!success)    {return }
        setLoading(true)
        try {
            const res = await fetch("/api/course" , {
                method : "POST" , 
                headers : {"Content-type" : "application/json"} , 
                body : JSON.stringify({title , notes}) 
             })
             const data = await res.json() ; 
             if(!res.ok){
                throw new Error(data.message) ; 
                console.log("voici error " , data.message)
             }
             toast.success("New cours added successfully") ; 
             fetchCourse() ; 
        } catch (error) {
            toast.error(error.message)
            console.log("Error adding new course" , error.message)
        }finally{
            setLoading(false) ; 
        }
    }

    return {courses , addCourse , fetchCourse , loading}
}

export default useCourse


function handleInputsError({title , notes}){
    if(!title){
        toast.error("Title of the course required") ; 
        return false ; 
    }
    return true ; 
}