/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { useStore } from "../store/date";
import { instance } from "../utils/axios";

interface TodoItem {
  colorTag: string;
  status: number;
  targetDate: string;
  targetTime: string;
  todoId: number;
  todoText: string;
  userId: number;
  weeklyScheduleId: number;
}

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

const getWeekDates = (baseDate: Date) => {
  const dates = [];
  const startOfWeek = new Date(baseDate);
  const dayOfWeek = baseDate.getDay();
  const offsetToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  startOfWeek.setDate(baseDate.getDate() + offsetToMonday);

  for (let i = 0; i < 7; i++) {
    dates.push(new Date(startOfWeek));
    startOfWeek.setDate(startOfWeek.getDate() + 1);
  }

  return dates;
};

const WeekCalendar = ({
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

  const handlePrevWeek = useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
  }, []);

  const handleNextWeek = useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
  }, []);

  const handleDateClick = useCallback(
    (date: Date) => {
      setSelectedDate(date);
    },
    [setSelectedDate]
  );

  const weekDates = React.useMemo(
    () => getWeekDates(currentDate),
    [currentDate]
  );

  // Fetch user ID once
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

  // Fetch todo items when userId or weekDates change
  useEffect(() => {
    const fetchTodoItems = async () => {
      if (!userId) return;

      const startDate = weekDates[0]
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");
      const endDate = weekDates[6]
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");

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
  }, [userId, weekDates]);

  const formatDateForHeader = (dates: Date[]) => {
    const startDate = dates[0];
    const endDate = dates[6];
    const startMonth = monthNames[startDate.getMonth()];
    const endMonth = monthNames[endDate.getMonth()];
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    if (startMonth === endMonth && startYear === endYear) {
      return `${startMonth} ${startYear}`;
    } else if (startYear === endYear) {
      return `${startMonth}-${endMonth} ${startYear}`;
    } else {
      return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
    }
  };

  const isDateSelected = useCallback(
    (date: Date) =>
      selectedDate && date.toDateString() === selectedDate.toDateString(),
    [selectedDate]
  );

  const getTodoStatusColor = useCallback(
    (date: Date) => {
      const dateString = date.toISOString().split("T")[0].replace(/-/g, "");
      const today = new Date().toISOString().split("T")[0].replace(/-/g, "");
      const todosForDate = todoItems.filter(
        (item) => item.targetDate.toString() === dateString
      );

      if (todosForDate.length === 0) return "";

      if (dateString > today) {
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

  return (
    <div className="w-[380px] text-center">
      <div className="flex items-center p-4 bg-gray-100 rounded-t-lg">
        <button
          onClick={handlePrevWeek}
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
          {formatDateForHeader(weekDates)}
        </div>
        <button
          onClick={handleNextWeek}
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
          src="/calendar.png"
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

      <div className="grid grid-cols-7 gap-2 p-2 rounded-b-lg">
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
              className={`z-20 relative mt-[8px] ${
                isDateSelected(date) ? "text-white" : "text-black"
              } 
              ${
                date.getMonth() !== weekDates[0].getMonth() ? "text-black" : ""
              }`}
            >
              {date.getDate()}
            </span>
            <div
              className={`absolute bottom-[-10px] w-1 h-1 rounded-full ${getTodoStatusColor(
                date
              )}`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekCalendar;
