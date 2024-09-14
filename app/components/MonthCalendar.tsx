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

const MonthCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 8, 1));
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
    <div className="w-64 mx-auto text-center">
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-t-lg">
        <button
          onClick={handlePrevMonth}
          className="text-gray-600 hover:text-gray-900"
        >
          &lt;
        </button>
        <div className="font-bold">
          {`${monthNames[currentMonth]} ${currentYear}`}
        </div>
        <button
          onClick={handleNextMonth}
          className="text-gray-600 hover:text-gray-900"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-xs p-2 bg-white">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
          <div key={day} className="text-gray-600">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 p-2 bg-white rounded-b-lg">
        {getMonthCalendarDates(currentYear, currentMonth).map(
          ({ date }, index) => (
            <div
              key={index}
              className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${
                date
                  ? date === selectedDate
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
    </div>
  );
};

export default MonthCalendar;
