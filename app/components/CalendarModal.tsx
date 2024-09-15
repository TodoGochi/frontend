/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

// Helper function to get the number of days in a month
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get the dates for the current month
const getMonthCalendarDates = (year, month) => {
  const dates = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const adjustedFirstDayWeekday =
    firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;

  for (let i = 0; i < adjustedFirstDayWeekday; i++) {
    dates.push({ date: null, currentMonth: false });
  }

  for (let i = 1; i <= getDaysInMonth(year, month); i++) {
    dates.push({
      date: i,
      currentMonth: true,
    });
  }

  return dates;
};

const CalendarModal = ({ setModal, setModal2 }: any) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
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

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
    setSelectedDate(null);
  };

  const handleDateClick = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  return (
    <div
      className="fixed h-screen inset-0 bg-black/50 z-[110] flex justify-center items-center"
      onClick={() => {
        setModal2(false);
      }}
    >
      <div
        className="w-[330px] h-[390px] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center p-4 bg-[#EDEDED] rounded-t-lg">
          <button
            onClick={handlePrevMonth}
            className="text-gray-600 hover:text-gray-900 mr-[20px]"
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
          <div className="font-bold min-w-[82px]">
            {`${monthNames[currentMonth]} ${currentYear}`}
          </div>
          <button
            onClick={handleNextMonth}
            className="text-gray-600 hover:text-gray-900 ml-[20px] mr-[90px]"
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
        <div className="grid grid-cols-7 gap-2 text-xs p-2 bg-[#EDEDED]">
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
            <div key={day} className="text-gray-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 p-2  bg-[#EDEDED]">
          {getMonthCalendarDates(currentYear, currentMonth).map(
            ({ date }, index) => (
              <div
                key={index}
                className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${
                  date
                    ? date === selectedDate &&
                      currentDate.getMonth() === new Date().getMonth() &&
                      currentDate.getFullYear() === new Date().getFullYear()
                      ? "bg-black text-white"
                      : "text-black hover:bg-gray-200"
                    : "text-transparent"
                }`}
                onClick={() => handleDateClick(date)}
              >
                {date || ""}
              </div>
            )
          )}
        </div>
        <div className="pt-[30px] w-full h-[65px] bg-[#EDEDED] flex justify-center items-center mx-auto rounded-b-lg pb-[30px]">
          <div className="cursor-pointer w-[290px] h-[35px] bg-[#FAFAFA] flex justify-center items-center rounded-lg">
            날짜 선택
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
