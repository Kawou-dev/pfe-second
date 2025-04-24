"use client";
import { useEffect, useState } from "react";
import { FiCheck, FiCalendar, FiBook, FiSun, FiSearch, FiBell, FiUser, FiImage, FiShare2, FiPlus } from "react-icons/fi";
import useTodo from "../hooks/useTodo";
import useTodoReducer1 from "@/options/useToReducer1";

import useCourse from "../hooks/useCourse";
import usePdf from "../hooks/usePdf";
import CourseSlider from "./CourseSlider";
import useVacance from "../hooks/useVacance";
import Link from "next/link";

const Dashboard = () => {

  const getTimeLeft = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end - now;
    // console.log(end)
    if (diff <= 0) return "Temps écoulé";
  
    const seconds = Math.floor(diff / 1000);
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
  
    return `${days}j ${hours}h ${minutes}min `;
  };

 

      


      const {fetchUrgTodo , urgs} = useTodo() ; 
      const {completeTodo , todos , fetchTodos} =  useTodoReducer1() ; 
    ; 
      const {fetchCourse ,  courses} = useCourse() ; 

      const {fetchVacance , vacances} = useVacance()  ; 


      const getUrgsTodo = async() => {
          await fetchUrgTodo() ; 
          await fetchTodos() ; 
          await fetchCourse() ; 
          await fetchVacance() ; 
      }
      useEffect(() =>{
          getUrgsTodo() ;

      }, [])

      const handleComplete = async(task) => {
            await completeTodo(task._id) ; 
            await fetchUrgTodo(); 
      }
      
    const finished = () => {
      const finishedTask = todos?.filter( (task) => task.isCompleted === true ) ; 
      const nbre = finishedTask?.length ; 
      return nbre ; 
   }
   const Unfinished = () => {
    const finishedTask = todos?.filter( (task) => task.isCompleted === false ) ; 
    const nbre = finishedTask?.length ; 
    return nbre ; 
 }
   const nbreFinished = finished()  ;
   const nbreUnFinished = Unfinished()  ;
  //  console.log(vacances)


  const actualDate = new Date(); 
  const day = actualDate.getDate(); 
  const month = actualDate.toLocaleString('fr-FR', { month: 'long' }); 
  const year = actualDate.getFullYear();
  const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const today = `${day} ${formattedMonth} ${year}`;
  
  console.log(today);
  


  return (
    <div className='flex flex-col lg:flex-row h-screen overflow-hidden'>
      {/* Main content section */}
      <section className='flex-1 lg:flex-3/4 h-[70%] lg:h-full overflow-y-auto scrollbar-thin  p-4 lg:px-4 lg:pt-5'>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* First column */}
          <div className="flex-1 space-y-4">
            {/* Todo list */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md h-[270px] overflow-y-auto scrollbar-thin  ">
              <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                <FiCheck className="mr-2 text-indigo-600" /> Todo List (Urgentes)
              </h2>
              {/* <ul>
                {tasks.map((task) => (
                  <li key={task.id} className="flex items-center py-2 border-b border-gray-100">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => {}}
                      className="mr-3 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className={`flex-1 ${task.done ? "line-through text-gray-400" : ""}`}>
                      {task.title}
                    </span>
                    <span className="text-sm text-gray-500">{task.deadline}</span>
                  </li>
                ))}
              </ul> */}
              <ul>
                {urgs.map((task , index) => (
                  <li  key={index} className="flex items-center py-2 border-b border-gray-100">
                                      <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onClick={() => handleComplete(task)}
                    onChange={() => {}}
                    className="mr-3 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                    <span className={`flex-1 ${task.isCompleted ? "line-through text-gray-400" : ""}`}>
                      {task.title}
                    </span>
                    <span className="text-sm text-gray-500">{getTimeLeft(task.deadline)}</span>
                    </li>
                ))}
              </ul>
            
          
            </div>

            {/* Study Progress */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md  md:w-[380px] w-[340px] lg-[380px]  ">
              <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                <FiBook className="mr-2 text-indigo-600" /> Progression des Études
              </h2>
              <div className="flex items-center  ">
                      <CourseSlider   courses={courses} />
              </div>
            </div>
          </div>












           {/* <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
              <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                <FiBook className="mr-2 text-indigo-600" /> Progression des Études
              </h2>
              <div className="flex items-center">
                <div className="w-full sm:w-1/2">
                  <p className="text-gray-700 mb-2"> Mathématiques </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">5/10 chapitres révisés</p>
                </div>
              </div>
            </div>
          </div>  */}




          {/* Second column */}
          <div className="flex-1 space-y-4">
            {/* Vacations List */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
              <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                <FiCalendar className="mr-2 text-indigo-600" /> Prochains Voyages
              </h2>

              {/* Cities to visit */}
              <div className="mb-4 sm:mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Villes planifiées</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { city: "Paris", priority: "Haute", date: "20 Oct 2023" },
                    { city: "Tokyo", priority: "Moyenne", date: "15 Déc 2023" },
                    { city: "New York", priority: "Basse", date: "Mars 2024" },
                  ].map((trip, index) => (
                    <div 
                      key={index} 
                      className={`p-2 sm:p-3 rounded-lg border ${trip.priority === "Haute" 
                        ? "bg-red-50 border-red-200" 
                        : trip.priority === "Moyenne" 
                        ? "bg-amber-50 border-amber-200" 
                        : "bg-blue-50 border-blue-200"}`}
                    >
                      <div className="font-medium text-sm sm:text-base">{trip.city}</div>
                      <div className="text-xs sm:text-sm text-gray-500">{trip.date}</div>
                      <div className={`text-xs mt-1 ${
                          trip.priority === "Haute" 
                          ? "text-red-600" 
                          : trip.priority === "Moyenne" 
                          ? "text-amber-600" 
                          : "text-blue-600"}`}
                      >
                        {trip.priority} priorité
                      </div>
                    </div>
                  ))}
                </div>
              </div>




              {/* Memory photos */}
            
            
              {/* <div className="mb-4 sm:mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Derniers souvenirs</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((item) => (
                    <div 
                      key={item} 
                      className="aspect-square bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center"
                    >
                      <FiImage className="text-gray-400 text-xl" />
                    </div>
                  ))}
                  <button className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50">
                    <FiPlus className="text-gray-400" />
                  </button>
                </div>
              </div> */}

                <div className="mb-4 sm:mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Derniers souvenirs</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {vacances?.map((vac, index) => (
                      <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                         {/* <a href={vac?.images}className=" cursor-pointer w-full h-full  " > <img src={vac?.images} className="cursor-pointer w-full h-full" /></a> */}
                         <a href={vac?.images} className="cursor-pointer w-full h-full">
                                <img
                                  src={vac?.images} className="cursor-pointer w-full h-full transition-opacity duration-300 hover:opacity-65"/>
                            </a>

                      </div>
                    ))}
                    <button className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50">
                      <FiPlus className="text-gray-400" />
                    </button>
                  </div>
                </div>




              {/* Travel notes */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Notes de voyage</h3>
                <textarea
                  placeholder="Décrivez votre expérience..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={3}
                />
                <div className="flex justify-end mt-2 space-x-2">
                  <button className="flex items-center text-sm bg-green-100 text-green-700 px-3 py-1 rounded-lg">
                    <FiShare2 className="mr-1" /> Partager
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
                    <hr className=" my-2    " />
      {/* Compact right sidebar */}
      <section className='lg:w-1/4 h-[30%] lg:h-full  lg:min-w-[250px] p-3  shadow-md lg:border-t-0 lg:border-l overflow-y-auto '>
        {/* Calendar */}
        <div className="bg-white p-3 rounded-xl shadow-md mb-4">
          <h2 className="text-lg font-bold mb-3 ml-3  flex  items-center">
            <FiCalendar className="mr-2  text-indigo-600 text-sm" /> Calendrier
          </h2>
          <div className="text-center text-sm">
            <p className="text-gray-600 mb-1 text-[16px] "> {today} </p>
            <div className="bg-indigo-100 text-indigo-800 p-1 rounded-lg mb-1 text-sm">
              📌 Examen de Maths
            </div>
            <div className="bg-green-100 text-green-800 p-1 rounded-lg text-sm">
              ✈️ Voyage à Paris
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white p-3 rounded-xl shadow-md mb-4">
          <h2 className="text-lg font-bold mb-3">Statistiques</h2>
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-gray-600">Tâches accomplies</p>
              <p className="font-bold"> {nbreFinished} /{todos.length}  </p>
            </div>
            <div>
              <p className="text-gray-600">En retard</p>
              <p className="font-bold text-red-500"> {nbreUnFinished} </p>
            </div>
          </div>
        </div>

        {/* Chatbot */}
        <Link href="/chat" >
        <button  className="w-full cursor-pointer bg-indigo-600 text-white py-2 px-3 rounded-lg flex items-center justify-center text-sm hover:bg-indigo-700">
          🤖 Besoin d'aide ?
        </button>
        </Link>
      </section>
    </div>
  )
}

export default Dashboard