
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useVacance = () => {
            const [loading, setLoading] = useState(false) ; 
            const [vacances , setVacances] = useState([])


            const fetchVacance = async() => {
                setLoading(true) ; 
                try {
                    const res = await fetch("/api/vacance") ; 
                    const data = await res.json() ; 
                    if(data.error) throw new Error(data.error)
                    setVacances(data.vacances)
                } catch (error) {
                    console.log("frontent-Erreur getting data " , error.message)
                    toast.error(error.message)
                }finally{
                    setLoading(false)
                }

            }

            const addVacance = async({cityName , experience , images}) => {
                  if (!cityName || !images)  {
                             toast.error("fields are required!");
                             return;
                         }
                         setLoading(true);
                         try {
                             const res = await fetch("/api/vacance", {
                                 method: "POST",
                                 headers: { "Content-Type": "application/json" },
                                 body: JSON.stringify({cityName , experience , images}),
                             });
                 
                             const data = await res.json();
                             if (data.error) throw new Error(data.error);
                 
                             toast.success("Vacance added successfully");
                             fetchVacance() ; 
                            
                         } catch (error) {
                             console.error("frontent-Erreur sending data:", error.message);
                             toast.error(error.message)
                         } finally {
                             setLoading(false);
                         }
            }

            return {loading , vacances , fetchVacance, addVacance}
}

export default useVacance
