"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "./Slider"; 
import useVacance from "../hooks/useVacance";
import { AiFillPicture } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import { FiUploadCloud, FiPlus } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Home = () => {
  const [pictures, setPictures] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [inputs, setInputs] = useState({
    cityName: "",
    experience: "",
    images: []
  });
  const [openPopupVac, setOpenPopupVac] = useState(false);
  const { loading, vacances, fetchVacance, addVacance } = useVacance();

  useEffect(() => {
    fetchVacance();
  }, []);

  const handlePopup = () => {
    setOpenPopupVac(!openPopupVac);
  };

  const handleAdd = async () => {
    await addVacance(inputs);
    setInputs({ ...inputs, cityName: "", experience: "", images: [] });
    setPictures([]);
    setOpenPopupVac(false);
  };

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
        console.error("Upload error: ", error);
      }
    }

    setPictures(uploadedImages);
    setInputs({ ...inputs, images: uploadedImages });
    setUploading(false);
  };

  const handleShareTask = (vac) => {
    const imagesWithTitles = vac.images
      .map((url, index) => `*🖼️ Image ${index + 1}* : ${url}`)
      .join("\n");
  
    const message = `Vacation: *${vac.cityName}*\n\n${imagesWithTitles}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header with Add Button */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Vacations</h1>
        <button
          onClick={handlePopup}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition-all"
        >
          <FiPlus size={20} />
          <span className="hidden sm:inline">Add Vacation</span>
          <span className="sm:hidden">Add</span>
        </button>
      </header>

      {/* Add Vacation Popup */}
      {openPopupVac && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">New Vacation</h2>
                <button onClick={handlePopup} className="text-gray-500 hover:text-red-500 transition">
                  <IoIosCloseCircle size={28} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    value={inputs.cityName}
                    onChange={(e) => setInputs({ ...inputs, cityName: e.target.value })}
                    placeholder="Where did you go?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    type="text"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <textarea
                    value={inputs.experience}
                    onChange={(e) => setInputs({ ...inputs, experience: e.target.value })}
                    placeholder="Describe your trip..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 min-h-[100px]"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photos (max 3)</label>
                  <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-50 transition">
                    <FiUploadCloud size={32} className="text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500 text-center">
                      Click to upload or drag and drop your photos
                    </span>
                    <input
                      onChange={handleImageChange}
                      accept="image/*"
                      multiple
                      type="file"
                      className="hidden"
                      max="3"
                    />
                  </label>
                </div>

                {pictures.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {pictures.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={img}
                          alt={`Preview ${idx}`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleAdd}
                  disabled={uploading || !inputs.cityName || pictures.length === 0}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${
                    uploading || !inputs.cityName || pictures.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {uploading ? "Uploading..." : "Save Vacation"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vacation List */}
      <main>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full animate-pulse"
                  style={{
                    backgroundColor: [
                      "#3B82F6",
                      "#10B981",
                      "#F59E0B",
                      "#EF4444",
                      "#8B5CF6"
                    ][i % 5],
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        ) : vacances.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vacances.map((vac, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48">
                  <Slider images={vac?.images} />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{vac?.cityName}</h3>
                  {vac.experience && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{vac.experience}</p>
                  )}
                  <button
                    onClick={() => handleShareTask(vac)}
                    className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition"
                  >
                    <FaWhatsapp size={18} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <AiFillPicture size={40} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">No vacations yet</h3>
            <p className="text-gray-500 mt-1">Start by adding your travel memories</p>
            <button
              onClick={handlePopup}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
            >
              Add Vacation
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
































// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Slider from "./Slider"; 
// import useVacance from "../hooks/useVacance";
// import { AiFillPicture } from "react-icons/ai";
// import { IoIosCloseCircle } from "react-icons/io";
// import { FiUploadCloud, FiPlus } from "react-icons/fi";
// import { FaWhatsapp } from "react-icons/fa";

// const Home = () => {
//   const [pictures, setPictures] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [inputs, setInputs] = useState({
//     cityName: "",
//     experience: "",
//     images: []
//   });
//   const [openPopupVac, setOpenPopupVac] = useState(false);
//   const { loading, vacances, fetchVacance, addVacance } = useVacance();

//   useEffect(() => {
//     fetchVacance();
//   }, []);

//   const handlePopup = () => {
//     setOpenPopupVac(!openPopupVac);
//   };

//   const handleAdd = async () => {
//     await addVacance(inputs);
//     setInputs({ ...inputs, cityName: "", experience: "", images: [] });
//     setPictures([]);
//     setOpenPopupVac(false);
//   };

//   const handleImageChange = async (e) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;

//     setUploading(true);
//     const uploadedImages = [];

//     for (let i = 0; i < Math.min(files.length, 3); i++) {
//       const formData = new FormData();
//       formData.append("file", files[i]);
//       formData.append("upload_preset", "todo_test");
//       formData.append("cloud_name", "dvnsrfsic");

//       try {
//         const response = await axios.post(
//           "https://api.cloudinary.com/v1_1/dvnsrfsic/image/upload",
//           formData
//         );
//         uploadedImages.push(response.data.secure_url);
//       } catch (error) {
//         console.error("Upload error: ", error);
//       }
//     }

//     setPictures(uploadedImages);
//     setInputs({ ...inputs, images: uploadedImages });
//     setUploading(false);
//   };

//   const handleShareTask = (vac) => {
//     const imagesWithTitles = vac.images
//       .map((url, index) => `*🖼️ Image ${index + 1}* : ${url}`)
//       .join("\n");
  
//     const message = `Vacation: *${vac.cityName}*\n\n${imagesWithTitles}`;
//     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, "_blank");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       {/* Header with Add Button */}
//       <header className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Vacations</h1>
//         <button
//           onClick={handlePopup}
//           className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition-all"
//         >
//           <FiPlus size={20} />
//           <span className="hidden sm:inline">Add Vacation</span>
//           <span className="sm:hidden">Add</span>
//         </button>
//       </header>

//       {/* Add Vacation Popup */}
//       {openPopupVac && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold text-gray-800">New Vacation</h2>
//                 <button onClick={handlePopup} className="text-gray-500 hover:text-red-500 transition">
//                   <IoIosCloseCircle size={28} />
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                   <input
//                     value={inputs.cityName}
//                     onChange={(e) => setInputs({ ...inputs, cityName: e.target.value })}
//                     placeholder="Where did you go?"
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//                     type="text"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
//                   <textarea
//                     value={inputs.experience}
//                     onChange={(e) => setInputs({ ...inputs, experience: e.target.value })}
//                     placeholder="Describe your trip..."
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 min-h-[100px]"
//                   ></textarea>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Photos (max 3)</label>
//                   <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-50 transition">
//                     <FiUploadCloud size={32} className="text-gray-400 mb-2" />
//                     <span className="text-sm text-gray-500 text-center">
//                       Click to upload or drag and drop your photos
//                     </span>
//                     <input
//                       onChange={handleImageChange}
//                       accept="image/*"
//                       multiple
//                       type="file"
//                       className="hidden"
//                       max="3"
//                     />
//                   </label>
//                 </div>

//                 {pictures.length > 0 && (
//                   <div className="grid grid-cols-3 gap-2">
//                     {pictures.map((img, idx) => (
//                       <div key={idx} className="relative group">
//                         <img
//                           src={img}
//                           alt={`Preview ${idx}`}
//                           className="w-full h-24 object-cover rounded-md"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <button
//                   onClick={handleAdd}
//                   disabled={uploading || !inputs.cityName || pictures.length === 0}
//                   className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${
//                     uploading || !inputs.cityName || pictures.length === 0
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-green-500 hover:bg-green-600"
//                   }`}
//                 >
//                   {uploading ? "Uploading..." : "Save Vacation"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Vacation List */}
//       <main>
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="flex space-x-2">
//               {[...Array(5)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="w-8 h-8 rounded-full animate-pulse"
//                   style={{
//                     backgroundColor: [
//                       "#3B82F6",
//                       "#10B981",
//                       "#F59E0B",
//                       "#EF4444",
//                       "#8B5CF6"
//                     ][i % 5],
//                     animationDelay: `${i * 0.1}s`
//                   }}
//                 ></div>
//               ))}
//             </div>
//           </div>
//         ) : vacances.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {vacances.map((vac, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//               >
//                 <div className="h-48">
//                   <Slider images={vac?.images} />
//                 </div>
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1">{vac?.cityName}</h3>
//                   {vac.experience && (
//                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">{vac.experience}</p>
//                   )}
//                   <button
//                     onClick={() => handleShareTask(vac)}
//                     className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition"
//                   >
//                     <FaWhatsapp size={18} />
//                     <span>Share</span>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//               <AiFillPicture size={40} className="text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-700">No vacations yet</h3>
//             <p className="text-gray-500 mt-1">Start by adding your travel memories</p>
//             <button
//               onClick={handlePopup}
//               className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
//             >
//               Add Vacation
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Home;