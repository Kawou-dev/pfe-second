
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useSignup = () => {

    const [loading , setLoading] = useState(false) ; 
    const router = useRouter() ;  

    const signup = async ({username , email , password , confirmPassword , genre}) => {
         setLoading(true) ; 
        try {
            const succes = handleInputsError({username , email , password , confirmPassword , genre}) ; 
            if(!succes){
                return ; 
            }

            const resUserExist = await fetch("/api/userExist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            
            const data1 = await resUserExist.json();
            
            if (!resUserExist.ok) {
                toast.error(data1.message); 
                return;
            }
            const res = await fetch("/api/register" , {
                method : "POST" , 
                headers : {"Content-Type" : "application/json"} , 
                body : JSON.stringify({username , email , password , confirmPassword , genre})
            })

            const data = await res.json() ; 
            if(data.error) throw new Error(data.error) ; 
            if(res.ok){
                toast.success("Succes")
                 router.replace("/login") 
            }
            
        } catch (error) {
            toast.error(error.message)    
        }finally{
            setLoading(false)
        }
        
    }


    return {loading , signup}
  
}

export default useSignup

function handleInputsError ({username , email , password , confirmPassword , genre}){
    if( !username || !email || !password  ||  !confirmPassword  || !genre  ){
        toast.error("All fields are reuired") ; 
        return false ; 
    }
    if(password !== confirmPassword) {
        toast.error("Password do not match !") ; 
        return false ; 
    }
    if(password.length < 6){
        toast.error("Password must contain 6 charactères") ; 
    }
    return true ; 
}
