"use client";

interface TodoItem {
  colorTag: string;
  status: number;
  targetDate: number;
  targetTime: string;
  todoId: number;
  todoText: string;
  userId: number;
  weeklyScheduleId: number;
}

import { useRouter } from "next/navigation";
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import { useStore } from "../store/date";
import { instance } from "../utils/axios";

// Helper function to get the number of days in a month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get the dates for the current month
const getMonthCalendarDates = (year: number, month: number) => {
  const dates = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const lastDateOfMonth = lastDayOfMonth.getDate();

  // Adjust for Monday as the first day of the week
  const adjustedFirstDayWeekday =
    firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;

  // Add days from the previous month
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const prevMonthLastDate = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
  for (
    let i = prevMonthLastDate - adjustedFirstDayWeekday + 1;
    i <= prevMonthLastDate;
    i++
  ) {
    dates.push({ date: i, month: prevMonth, year: prevMonthYear });
  }

  // Add days from the current month
  for (let i = 1; i <= lastDateOfMonth; i++) {
    dates.push({ date: i, month: month, year: year });
  }

  // Add days from the next month
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextMonthYear = month === 11 ? year + 1 : year;
  let nextMonthDay = 1;
  while (dates.length < 42) {
    // 6 rows * 7 days
    dates.push({ date: nextMonthDay, month: nextMonth, year: nextMonthYear });
    nextMonthDay++;
  }

  return dates;
};

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

const MonthCalendar = ({
  setMonth,
  month,
}: {
  setMonth: (value: boolean) => void;
  month: boolean;
}) => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  const selectedDate = useStore((state) => state.selectedDate);
  const setSelectedDate = useStore((state) => state.setSelectedDate);

  const handlePrevMonth = useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }, []);

  const handleDateClick = useCallback(
    (day: number, month: number, year: number) => {
      const newSelectedDate = new Date(year, month, day);
      setSelectedDate(newSelectedDate);
    },
    [setSelectedDate]
  );

  const getTodoStatusColor = useCallback(
    (date: Date) => {
      // 날짜를 YYYYMMDD 형식의 문자열로 변환 (현지 시간 기준)
      const dateString = `${date.getFullYear()}${String(
        date.getMonth() + 1
      ).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;

      // 오늘 날짜도 동일한 방식으로 생성
      const today = new Date();
      const todayString = `${today.getFullYear()}${String(
        today.getMonth() + 1
      ).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

      const todosForDate = todoItems.filter(
        (item) => item.targetDate.toString() === dateString
      );

      if (todosForDate.length === 0) return "";

      if (dateString > todayString) {
        return "bg-gray-500"; // Future todo
      }

      const hasCompletedTodo = todosForDate.some((item) => item.status === 1);
      const hasInProgressTodo = todosForDate.some((item) => item.status === 0);

      if (hasCompletedTodo && !hasInProgressTodo) {
        return "bg-green-500"; // All todos completed
      } else if (hasInProgressTodo) {
        return "bg-pink-500"; // At least one todo in progress
      }

      return "";
    },
    [todoItems]
  );

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await instance("/user");
        setUserId(res.data.userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchTodoItems = async () => {
      if (!userId) return;

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const startDate = `${year}${month.toString().padStart(2, "0")}01`;
      const endDate = `${year}${month
        .toString()
        .padStart(2, "0")}${getDaysInMonth(year, month - 1)}`;

      try {
        const response = await instance.get(
          `/todolist/period?userId=${userId}&startDate=${startDate}&endDate=${endDate}`
        );
        const data = response.data;
        setTodoItems(data);
      } catch (error) {
        console.error("Error fetching todo items:", error);
      }
    };

    fetchTodoItems();
  }, [userId, currentDate]);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  return (
    <div className="w-[380px] text-center">
      <div className="flex items-center p-4 bg-gray-100 rounded-t-lg">
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
        <img
          onClick={() => setMonth(!month)}
          src="/calendarBlack.png"
          alt="calendar"
          className="mr-[12px] cursor-pointer"
        />
        <img
          src="/setting.svg"
          alt="setting"
          className="cursor-pointer"
          onClick={() => router.push("/settings")}
        />
      </div>
      <div className="grid grid-cols-7 gap-2 text-xs p-2">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
          <div key={day} className="text-gray-600">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 p-2 rounded-b-lg">
        {getMonthCalendarDates(currentYear, currentMonth).map(
          ({ date, month, year }, index) => {
            const isCurrentMonth = month === currentMonth;
            const isSelected =
              selectedDate &&
              selectedDate.getFullYear() === year &&
              selectedDate.getMonth() === month &&
              selectedDate.getDate() === date;

            const statusColor = getTodoStatusColor(new Date(year, month, date));

            return (
              <div
                key={index}
                className={`relative rounded-full w-8 h-8 flex flex-col items-center justify-center cursor-pointer ${
                  isCurrentMonth
                    ? isSelected
                      ? "bg-black text-white"
                      : "text-black hover:bg-gray-200"
                    : "text-gray-400"
                }`}
                onClick={() => handleDateClick(date, month, year)}
              >
                {date}
                {statusColor && (
                  <div
                    className={`absolute bottom-[-5px] w-1 h-1 rounded-full ${statusColor}`}
                  ></div>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default MonthCalendar;
