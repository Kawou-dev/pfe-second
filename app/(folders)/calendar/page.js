"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 

const Page = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className=" flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold text-green-500 text-center">Calendrier</h1>

      <div className="border rounded-lg p-4 shadow-md">
        <Calendar 
          className="calendar-custom" 
          onChange={setDate} 
          value={date} 
        />
      </div>

      <div className="flex gap-1 items-baseline">
      {/* {date.toLocaleDateString("fr-FR")} */}
          <p className="text-xl text-slate-900    "> 
             Date selectionnée:
          </p>
          <p className="text-xl text-green-400 ml-1">
          {date.toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
       
      </div>
    </div>
  );
};

export default Page;
