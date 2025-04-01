"use client";
import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [uploading, setUploading] = useState(false);

 
  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);

    
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "todo_test"); 
      formData.append("cloud_name", "dvnsrfsic"); 

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dvnsrfsic/image/upload", 
          formData
        );

        const imageUrl = response.data.secure_url; 
        setPicture(imageUrl);
        setUploading(false);
      } catch (error) {
        console.error("Erreur d'upload : ", error);
        setUploading(false);
      }
    }
  };

 
  const handleAddTask = () => {
    if (name.trim() === "" || !picture) {
      alert("Please fill out both fields before adding a task.");
      return;
    }

    setTasks([...tasks, { name, picture }]); 
    setName(""); 
    setPicture(null); 
  };

  
  const handleShareTask = (task) => {
    const message = `${task.name}\nImage : ${task.picture}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank"); 
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-center text-xl font-bold">Welcome to Kawou Platform</h1>

     
      <div className="p-4 flex items-center flex-col gap-4 border-2 border-black w-[60%] mx-auto h-auto">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="border-2 pl-2 border-black w-[300px] p-2"
          type="text"
          aria-label="Enter your name"
        />

        <input
          onChange={handleImageChange}
          accept="image/*"
          className="border-2 py-3 border-black w-[300px]"
          type="file"
          aria-label="Upload your picture"
        />

      
        {uploading ? (
          <p>Uploading...</p>
        ) : (
          picture && (
            <img
              src={picture}
              alt="Preview"
              className="w-[100px] h-[100px] object-cover border-2 border-black"
            />
          )
        )}

        
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          aria-label="Add Task"
        >
          Ajouter
        </button>
      </div>

    
      <section className="w-[80%] mx-auto mt-5">
        <h2 className="text-lg font-bold">Liste des tâches :</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
          {tasks.map((task, index) => (
            <div key={index} className="border-2 p-3 flex flex-col items-center gap-2">
              <img
                src={task.picture}
                alt={task.name}
                className="w-[100px] h-[100px] object-cover border"
              />
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
