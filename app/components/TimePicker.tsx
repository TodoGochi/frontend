/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

const CustomTimePicker = () => {
  // State variables for time picker
  const [amPm, setAmPm] = useState("AM");
  const [hours, setHours] = useState(10);
  const [minutes, setMinutes] = useState("00");

  // Handler for AM/PM toggle
  const toggleAmPm = () => {
    setAmPm((prev) => (prev === "AM" ? "PM" : "AM"));
  };

  // Handler for hours input change
  const handleHoursChange = (e: any) => {
    let value = Math.max(1, Math.min(12, Number(e.target.value))); // Ensure value is between 1 and 12
    setHours(value);
  };

  // Handler for minutes input change
  // Handler for minutes input change
  const handleMinutesChange = (e) => {
    let value = Math.max(0, Math.min(59, Number(e.target.value))); // Ensure value is between 0 and 59
    setMinutes(value.toString().padStart(2, "0")); // Always keep minutes as two digits
  };

  return (
    <div className="flex items-center  p-3 rounded-md ml-[50px] mb-[10px]">
      <img src="/clock.svg" alt="clock" className="mr-[10px]" />
      <button
        onClick={toggleAmPm}
        className="bg-gray-100 px-[10px]  text-lg rounded-md  shadow-sm hover:bg-gray-200 focus:outline-none text-[12px] mr-[5px]"
      >
        {amPm}
      </button>
      <input
        type="number"
        value={hours}
        onChange={handleHoursChange}
        className="max-w-[45px]  text-lg text-right bg-gray-100 outline-none flex justify-center items-center"
        min="1"
        max="12"
      />
      <span className="mx-2 text-lg">:</span>
      <input
        type="number"
        value={minutes}
        onChange={handleMinutesChange}
        className="max-w-[45px] text-lg text-right bg-gray-100 outline-none flex justify-center items-center"
        min="0"
        max="59"
      />
    </div>
  );
};

export default CustomTimePicker;
