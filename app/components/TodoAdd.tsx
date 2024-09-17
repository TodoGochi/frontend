"use client";

import React, { useState, KeyboardEvent, useEffect } from "react";
import CustomTimePicker from "./TimePicker";
import { useTimePicker } from "../hooks/timepicker";

interface TodoItem {
  id: number;
  text: string;
  color: string;
  days: string[];
  time: string;
}

interface TodoAddProps {
  setAdd: (value: boolean) => void;
  onAddTodo: (todo: Omit<TodoItem, "id">) => void;
  initialData: TodoItem | null;
}

const TodoAdd: React.FC<TodoAddProps> = ({
  setAdd,
  onAddTodo,
  initialData,
}) => {
  const [timeState, timeActions] = useTimePicker();
  const [selectedDays, setSelectedDays] = useState<string[]>(
    initialData?.days || []
  );
  const [selectedColor, setSelectedColor] = useState(
    initialData?.color ? `bg-[#${initialData.color}]` : "bg-[#ff9b99]"
  );
  const [inputValue, setInputValue] = useState(initialData?.text || "");

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const colors = [
    "bg-[#ff9b99]",
    "bg-[#fdc38e]",
    "bg-[#f7e583]",
    "bg-[#a6e091]",
    "bg-[#78c1f6]",
    "bg-[#ba9edd]",
    "bg-[#d7d7d7]",
  ];

  useEffect(() => {
    if (initialData) {
      const [h, m, p] = initialData.time.split(/:| /);
      const newHours = parseInt(h);
      const newMinutes = m;
      const newAmPm = p as "AM" | "PM";

      // 시간 설정
      const event = {
        target: { value: newHours.toString() },
      } as React.ChangeEvent<HTMLInputElement>;
      timeActions.handleHoursChange(event);

      // 분 설정
      const minutesEvent = {
        target: { value: newMinutes },
      } as React.ChangeEvent<HTMLInputElement>;
      timeActions.handleMinutesChange(minutesEvent);

      // AM/PM 설정
      if (timeState.amPm !== newAmPm) {
        timeActions.toggleAmPm();
      }
    }
  }, [initialData, timeActions, timeState.amPm]);

  const toggleDay = (day: string) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const newTodo = {
      text: inputValue,
      color: selectedColor.replace("bg-[#", "").replace("]", ""),
      days: selectedDays,
      time: `${timeState.hours}:${timeState.minutes} ${timeState.amPm}`,
    };
    onAddTodo(newTodo);
    setInputValue("");
    setSelectedDays([]);
    setSelectedColor("bg-[#ff9b99]");
    setAdd(false);
  };

  return (
    <div className="w-[348px] mx-auto shadow-lg rounded-lg bg-[#FFFFFF] mt-[10px]">
      <div className="p-4">
        <div className="flex mb-[20px]">
          <input
            className="border-b border-[#a5a5a5] w-[269px] mr-[8px] focus:outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <svg
            className="cursor-pointer"
            onClick={() => setAdd(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <g id="todo_btn_minus">
              <path id="Union" d="M8 14H22V15H8V14Z" fill="#3F3F3F" />
            </g>
          </svg>
        </div>
        <div className="flex mb-4 gap-[10px]">
          {days.map((day) => (
            <button
              key={day}
              className={`text-[10px] max-w-[35px] px-[7px] py-[5px] rounded ${
                selectedDays.includes(day)
                  ? "bg-gray-800 text-white"
                  : "text-gray-800"
              }`}
              onClick={() => toggleDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        <CustomTimePicker />

        <div className="flex space-x-2 mb-4">
          {colors.map((color, index) => (
            <button
              key={color}
              className={`w-10 h-5 rounded-[5px] border-2 
        ${colors[index]}
        ${selectedColor === color ? "border-gray-800" : "border-transparent"}`}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded mt-4"
        >
          {initialData ? "수정" : "추가"}
        </button>
      </div>
    </div>
  );
};

export default TodoAdd;
