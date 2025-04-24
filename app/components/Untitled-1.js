"use client";
import React, { useState } from "react";
import axios from "axios";
import Slider from "./Slider"; 

const Home = () => {
  const [name, setName] = useState("");
  const [pictures, setPictures] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [inputs, setInputs] = useState({
      cityName : "" , 
      experience : "" , 
      images : [] 
  })

  

  const handleImageChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedImages = [];

    for (let i = 0; i < Math.min(files.length, 3); i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", "todo_test");
      formData.append("cloud_name", "dvnsrfsic");

      try {
        const response = await axios.post("https://api.cloudinary.com/v1_1/dvnsrfsic/image/upload",  formData );
        uploadedImages.push(response.data.secure_url);
      } catch (error) {
        console.error("Erreur d'upload : ", error);
      }
    }

    setPictures(uploadedImages);
    setUploading(false);
  };

  const handleAddTask = () => {
    if (name.trim() === "" || pictures.length === 0) {
      alert("Please fill out both fields before adding a task.");
      return;
    }

    setTasks([...tasks, { name, pictures }]);
    setName("");
    setPictures([]);
  };

  const handleShareTask = (task) => {
    const message = `${task.name}\nImages : ${task.pictures.join("\n")}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    // <div className="flex flex-col gap-5 p-5">
    //   {/* Div pour ajouter une tâche */}

    //   <div>
    //     <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
    // <div className="mb-6 text-center">
    //   <h1 className="text-3xl font-bold text-gray-800">Immortaliser vos vacances</h1>
    //   <p className="text-sm text-gray-500">Ajoutez le lieu et quelques photos souvenir 🌴</p>
    // </div>

    // <div className="mb-4">
    //   <input
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}
    //     placeholder="Entrez le lieu"
    //     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    //     type="text"
    //     aria-label="Enter your name"
    //   />
    // </div>

    // <div className="mb-4">
    //   <input
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}
    //     placeholder="Decrivez vos vacances"
    //     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    //     type="text"
    //     aria-label="Enter your name"
    //   />
    // </div>

    // <div className="mb-2 relative      ">
    //   <label className="flex flex-col items-center justify-center px-4 py-2  bg-blue-500 text-white rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition duration-300">
    //     <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-4 4m4-4l4 4" />
    //     </svg>
    //     <span className="text-sm font-medium">Choisir des photos</span>
    //     <input
    //       onChange={handleImageChange}
    //       accept="image/*"
    //       multiple
    //       type="file"
    //       className="hidden"
    //     />
    //   </label>
    // </div>
    //                     {/*   div uploade images */}
    //                 {/* <div className="flex justify-center mt-3  relative ">
                      
    //                          {uploading ? (
    //                                     <p>Uploading...</p>
    //                                   ) : (
    //                                     pictures.length > 0 && (
    //                                       <div className="flex gap-2">
    //                                         {pictures.map((img, idx) => (
    //                                           <img
    //                                             key={idx}
    //                                             src={img}
    //                                             alt={`Preview ${idx}`}
    //                                             className="w-[80px] h-[80px] object-cover border"
    //                                           />
    //                                         ))}
    //                                       </div>
    //                                     )
    //                                   )}
    //                 </div> */}
    //                 <div className="flex justify-center mt-3 relative overflow-auto max-w-full">
    //                     {uploading ? (
    //                       <p>Uploading...</p>
    //                     ) : (
    //                       pictures.length > 0 && (
    //                         <div className="flex gap-2 flex-wrap">
    //                           {pictures.map((img, idx) => (
    //                             <img
    //                               key={idx}
    //                               src={img}
    //                               alt={`Preview ${idx}`}
    //                               className="w-20 h-20 object-cover border rounded"
    //                             />
    //                           ))}
    //                         </div>
    //                       )
    //                     )}
    //                 </div>

    //               <div className="mt-4 relative  flex justify-center   ">
    //               <button  onClick={handleAddTask}
    //                         className="bg-blue-500 text-white cursor-pointer  px-4 py-2 rounded-md hover:bg-blue-700 transition">
    //                                 Ajouter
    //                               </button>
    //               </div>
        
    //     </div>

    //   </div>

    //   {/* Section des vacances */}
    //   <section className="w-[90%] mx-auto mt-5">
    //     <h2 className="text-lg font-bold">Vos Vacances</h2>
    //     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
    //       {tasks.map((task, index) => (
    //         <div key={index} className="border-2 rounded-2xl p-3 flex flex-col items-center gap-2 w-[200px]">
    //           <Slider images={task.pictures} />
    //           <p className="font-semibold">{task.name}</p>
    //           <button
    //             onClick={() => handleShareTask(task)}
    //             className="bg-green-500 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-green-700 transition mt-2"
    //           >
    //             Partager sur WhatsApp
    //           </button>
    //         </div>
    //       ))}
    //     </div>
    //   </section>
    // </div>
    <div className="flex flex-col gap-5 p-5">
  {/* Div pour ajouter une tâche */}
  <div>
    <div className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Immortaliser vos vacances</h1>
        <p className="text-sm text-gray-500">Ajoutez le lieu et quelques photos souvenir 🌴</p>
      </div>

      <div className="mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Entrez le lieu"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
      
        />
      </div>

      <div className="mb-4">
        <textarea
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Décrivez vos vacances"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
        
        ></textarea>
      </div>

      <div className="mb-2 relative">
        <label className="flex flex-col items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition duration-300">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-4 4m4-4l4 4" />
          </svg>
          <span className="text-sm font-medium">Choisir des photos</span>
          <input
            onChange={handleImageChange}
            accept="image/*"
            multiple
            type="file"
            className="hidden"
          />
        </label>
      </div>

      <div className="flex justify-center mt-3 relative overflow-auto max-w-full">
        {uploading ? (
          <p>Uploading...</p>
        ) : (
          pictures.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {pictures.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Preview ${idx}`}
                  className="w-20 h-20 object-cover border rounded"
                />
              ))}
            </div>
          )
        )}
      </div>

      <div className="mt-4 relative flex justify-center">
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Ajouter
        </button>
      </div>
    </div>
  </div>

  {/* Section des vacances */}
  <section className="w-[90%] mx-auto mt-5">
    <h2 className="text-lg font-bold">Vos Vacances</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
      {tasks.map((task, index) => (
        <div key={index} className="border-2 rounded-2xl p-3 flex flex-col items-center gap-2 w-[200px]">
          <Slider images={task.pictures} />
          <p className="font-semibold">{task.name}</p>
          <button
            onClick={() => handleShareTask(task)}
            className="bg-green-500 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-green-700 transition mt-2"
          >
            Partager sur WhatsApp
          </button>
        </div>
      ))}
    </div>
  </section>
</div>

  );
};

export default Home;
