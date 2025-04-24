"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCourse from "../hooks/useCourse";
import Link from "next/link";

const Etude = () => {
  const [formData, setFormData] = useState({
    title: "",
    notes: "",
  });

  const { fetchCourse, addCourse, courses, loading } = useCourse();
  const [isOpenPopup , setIsOpenPopup] = useState(false) ;

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleSubmit = async (formData) => {
    await addCourse(formData);
    setFormData({ title: "", notes: "" }); 
  };

  const handlePopup = () => {
        setIsOpenPopup(!isOpenPopup)
  }

  return (
    <div className="text-xl">
          {isOpenPopup && (
                <div className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="mb-6 text-center">
                  <h1 className="text-3xl font-bold text-gray-800">Ajouter un cours</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Prenez des notes de vos cours !
                  </p>
                </div>
        
                <div className="mb-4">
                  <input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Entrer le nom du module"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                  />
                </div>
        
        
                <div className="mb-4">
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Ajouter une description de ce cours"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-28 "
                    rows={4}
                  ></textarea>
                </div>
        
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => handleSubmit(formData)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
          )}


          <div  className="absolute md:right-3 right-1 md:top-20 flex justify-end items-end   w-20 ">
             <button onClick={handlePopup} className="border-blue-300 border-2 w-20 rounded-2xl cursor-pointer p-1 bg-blue-600 hover:bg-blue-700 text-white  "> Ajouter </button>
          </div>

        <div className="mt-8 ml-6 w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%]  ">
             <div>
              <h1 className="text-xl font-semibold">Mes cours</h1>
              <p>Vu d'ensembles de mes cours</p>
             </div>
        </div>


      <section className="mt-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[80%] xl:w-[80%] mx-auto">
        {loading ? (
          <p className="text-center text-gray-500">Chargement des cours...</p>
        ) : (
          <div className="grid md:flex-wrap grid-cols-1 md:grid-cols-3 gap-5">
            {courses.map((course, index) => (
              <div key={index} className="border flex flex-col p-[2px] gap-2 pb-2 rounded-lg shadow-sm bg-gray-100">
                    <Link href={`/etudes/${course._id}`}>
                      <div className="bg-[#552277]  w-full h-24 rounded-t-lg  ">
                              
                      </div>
                  </Link>
                    <div className="pl-4">
                      <Link href={`/etudes/${course._id}`}>
                    <h2 className="font-semibold text-lg text-blue-700  hover:underline ">{course?.title}</h2></Link>
                     <p className="text-gray-700 ">{course?.notes}</p>
                    </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Etude;
