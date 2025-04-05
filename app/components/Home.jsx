"use client";
import React, { useState } from "react";
import axios from "axios";

// Slider simple
const Slider = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  if (images.length === 0) return null;

  return (
    <div className="relative w-[100px] h-[100px]">
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className="w-full h-full object-cover border"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white px-1"
          >
            ◀
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white px-1"
          >
            ▶
          </button>
        </>
      )}
    </div>
  );
};

const Home = () => {
  const [name, setName] = useState("");
  const [pictures, setPictures] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [uploading, setUploading] = useState(false);

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
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dvnsrfsic/image/upload",
          formData
        );
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
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-center text-xl font-bold">Welcome to Kawou Platform</h1>

      <div className="p-4 flex items-center flex-col gap-4 border-2 border-black w-[60%] mx-auto h-auto">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="border-2 pl-2 border-black w-[300px] p-2"
          type="text" accept="image/*"
          aria-label="Enter your name"
        />

        <input
          onChange={handleImageChange}
          accept="image/*"
          multiple
          className="border-2 py-3 border-black w-[300px]"
          type="file"
          aria-label="Upload your picture"
        />

        {uploading ? (
          <p>Uploading...</p>
        ) : (
          pictures.length > 0 && (
            <div className="flex gap-2">
              {pictures.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Preview ${idx}`}
                  className="w-[80px] h-[80px] object-cover border"
                />
              ))}
            </div>
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
