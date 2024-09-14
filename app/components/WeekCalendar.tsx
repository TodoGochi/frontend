import React, { useState } from "react";

const getWeekDates = (baseDate) => {
  const dates = [];
  const startOfWeek = new Date(baseDate);
  startOfWeek.setDate(baseDate.getDate() - baseDate.getDay() + 1); // Adjust to Monday

  for (let i = 0; i < 7; i++) {
    dates.push(new Date(startOfWeek));
    startOfWeek.setDate(startOfWeek.getDate() + 1);
  }

  return dates;
};

const WeekCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜를 기준으로 설정
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const handlePrevWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const weekDates = getWeekDates(currentDate);

  const formatDateForHeader = (dates) => {
    const startDate = dates[0];
    const startMonth = monthNames[startDate.getMonth()];
    const startYear = startDate.getFullYear();
    return `${startMonth} ${startYear}`;
  };

  const isDateSelected = (date) =>
    selectedDate && date.toDateString() === selectedDate.toDateString();

  return (
    <div className="w-64 mx-auto text-center">
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-t-lg">
        <button
          onClick={handlePrevWeek}
          className="text-gray-600 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <g id="todo_btn_pre">
              <path
                id="previous"
                d="M17 22L18 22L18 7L17 7L17 8L16 8L16 9L15 9L15 10L14 10L14 11L13 11L13 12L12 12L12 13L11 13L11 14L10 14L10 15L11 15L11 16L12 16L12 17L13 17L13 18L14 18L14 19L15 19L15 20L16 20L16 21L17 21L17 22Z"
                fill="#737373"
              />
            </g>
          </svg>
        </button>
        <div className="font-bold">{formatDateForHeader(weekDates)}</div>
        <button
          onClick={handleNextWeek}
          className="text-gray-600 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <g id="todo_btn_next">
              <path
                id="next"
                d="M13 8L12 8L12 23L13 23L13 22L14 22L14 21L15 21L15 20L16 20L16 19L17 19L17 18L18 18L18 17L19 17L19 16L20 16L20 15L19 15L19 14L18 14L18 13L17 13L17 12L16 12L16 11L15 11L15 10L14 10L14 9L13 9L13 8Z"
                fill="#737373"
              />
            </g>
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 p-2 bg-white rounded-b-lg">
        {weekDates.map((date, index) => (
          <div
            key={`weekday-${date.toISOString()}`}
            onClick={() => handleDateClick(date)}
            className={`relative cursor-pointer flex flex-col items-center justify-center p-2 rounded-lg
              ${
                isDateSelected(date)
                  ? "bg-neutral-700 text-white"
                  : "hover:bg-gray-200"
              }`}
          >
            <div
              className={`text-xs ${
                isDateSelected(date) ? "text-white" : "text-gray-600"
              }`}
            >
              {weekdays[index]}
            </div>
            <span
              className={`z-20 relative ${
                isDateSelected(date) ? "text-white" : "text-black"
              } ${
                date.getMonth() !== weekDates[0].getMonth()
                  ? "text-gray-400"
                  : ""
              }`}
            >
              {date.getDate()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekCalendar;
