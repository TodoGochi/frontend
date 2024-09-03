"use client";

import { useState } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"weekly" | "monthly">("weekly");

  // Helper function to get the days of the current week
  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startOfWeek.setDate(diff);

    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      daysOfWeek.push(day);
    }

    return daysOfWeek;
  };

  // Helper function to get the days of the current month
  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(new Date(year, month, i));
    }

    return daysArray;
  };

  // Move to previous week or month
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "weekly") {
      newDate.setDate(currentDate.getDate() - 7); // Move a week back
    } else {
      newDate.setMonth(currentDate.getMonth() - 1); // Move a month back
    }
    setCurrentDate(newDate);
  };

  // Move to next week or month
  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "weekly") {
      newDate.setDate(currentDate.getDate() + 7); // Move a week forward
    } else {
      newDate.setMonth(currentDate.getMonth() + 1); // Move a month forward
    }
    setCurrentDate(newDate);
  };

  // Get the days for the current week or month
  const weekDays = getWeekDays(currentDate);
  const monthDays = getMonthDays(currentDate);

  return (
    <div className="flex flex-col items-center p-4 bg-white opacity-100 rounded-lg shadow max-w-md mx-auto">
      <div className="flex justify-between items-center w-full mb-4">
        {/* Previous button */}
        <button
          onClick={handlePrevious}
          className="text-lg cursor-pointer text-black"
        >
          &lt;
        </button>

        {/* Displaying current date range or month */}
        <span className="text-lg font-bold text-gray-900">
          {viewMode === "weekly"
            ? `${weekDays[0].toLocaleDateString()} - ${weekDays[6].toLocaleDateString()}`
            : currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
        </span>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="text-lg cursor-pointer text-black"
        >
          &gt;
        </button>

        {/* Toggle button for changing view mode */}
        <button
          onClick={() =>
            setViewMode(viewMode === "weekly" ? "monthly" : "weekly")
          }
          className="ml-4 bg-gray-200 rounded-full p-2 text-sm font-bold text-gray-900"
        >
          {viewMode === "weekly" ? "M" : "W"}
        </button>
      </div>

      {/* Weekly or monthly view based on selected mode */}
      {viewMode === "weekly" ? (
        <div className="grid grid-cols-7 gap-1 w-full">
          {weekDays.map((date) => (
            <div
              key={date.toDateString()}
              className="flex flex-col items-center"
            >
              <span className="text-sm font-medium text-black">
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <div
                className={`flex justify-center items-center w-8 h-8 text-black rounded-full ${
                  date.toDateString() === new Date().toDateString()
                    ? "bg-gray-300"
                    : ""
                }`}
              >
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1 w-full">
          {monthDays.map((date) => (
            <div
              key={date.toDateString()}
              className="flex flex-col items-center"
            >
              <span
                className={`flex justify-center items-center w-8 h-8 rounded-full text-gray-900 ${
                  date.toDateString() === new Date().toDateString()
                    ? "bg-gray-300"
                    : ""
                }`}
              >
                {date.getDate()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
