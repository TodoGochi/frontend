"use client";

import React, { useState, KeyboardEvent, useEffect, useCallback } from "react";
import CustomTimePicker from "./TimePicker";
import { useTimePicker } from "../hooks/timepicker";
import { instance } from "../utils/axios";

interface TodoItem {
  id: number;
  text: string;
  color: string;
  days: string[];
  time: string;
}

interface ApiTodoItem {
  userId: number;
  todoText: string;
  colorTag: string;
  days: string[];
  targetTime: string;
}

interface TodoAddProps {
  setAdd: (value: boolean) => void;
  onAddTodo: (todo: ApiTodoItem) => void;
  initialData: TodoItem | null;
  tutorial?: boolean;
}

const TodoAdd: React.FC<TodoAddProps> = ({
  setAdd,
  onAddTodo,
  initialData,
  tutorial,
}) => {
  const [timeState, timeActions] = useTimePicker();
  const [selectedDays, setSelectedDays] = useState<string[]>(
    initialData?.days || []
  );
  const [selectedColor, setSelectedColor] = useState(
    initialData?.color ? `bg-[#${initialData.color}]` : "bg-[#ff9b99]"
  );
  const [inputValue, setInputValue] = useState(initialData?.text || "");
  const [click, setClick] = useState(false);

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

  const colorToTag: { [key: string]: string } = {
    "bg-[#ff9b99]": "RED",
    "bg-[#fdc38e]": "ORANGE",
    "bg-[#f7e583]": "YELLOW",
    "bg-[#a6e091]": "GREEN",
    "bg-[#78c1f6]": "BLUE",
    "bg-[#ba9edd]": "PURPLE",
    "bg-[#d7d7d7]": "GRAY",
  };

  const dayToFull: { [key: string]: string } = {
    MON: "Monday",
    TUE: "Tuesday",
    WED: "Wednesday",
    THU: "Thursday",
    FRI: "Friday",
    SAT: "Saturday",
    SUN: "Sunday",
  };

  const handleCheckboxChange = useCallback(() => {
    setClick((prev) => !prev);
  }, []);

  useEffect(() => {
    if (initialData) {
      const [h, m, p] = initialData.time.split(/:| /);
      const newHours = parseInt(h);
      const newMinutes = m;
      const newAmPm = p as "AM" | "PM";

      const event = {
        target: { value: newHours.toString() },
      } as React.ChangeEvent<HTMLInputElement>;
      timeActions.handleHoursChange(event);

      const minutesEvent = {
        target: { value: newMinutes },
      } as React.ChangeEvent<HTMLInputElement>;
      timeActions.handleMinutesChange(minutesEvent);

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
    const hours =
      timeState.hours === 12
        ? timeState.amPm === "AM"
          ? "00"
          : "12"
        : timeState.amPm === "PM"
        ? (timeState.hours + 12).toString()
        : timeState.hours.toString().padStart(2, "0");

    const apiTodo: ApiTodoItem = {
      userId: 1, // 임시로 고정된 userId 사용
      todoText: inputValue,
      colorTag: colorToTag[selectedColor] || "RED",
      days: selectedDays.map((day) => dayToFull[day]),
      targetTime: `${hours}:${timeState.minutes}`,
    };
    onAddTodo(apiTodo);
    setInputValue("");
    setSelectedDays([]);
    setSelectedColor("bg-[#ff9b99]");
    setAdd(false);

    const res = instance.post("/todolist/weekly", apiTodo);
  };

  return (
    <div className="w-[348px] mx-auto  rounded-lg bg-[#FFFFFF] mt-[10px]">
      <div className="p-4">
        <div className="flex mb-[20px] mt-[5px]">
          <div className="relative w-[10px]">
            <input
              type="checkbox"
              className="absolute z-[1] mr-3 opacity-0"
              onChange={handleCheckboxChange}
            />
            {click ? (
              <svg
                className="absolute z-[0] bottom-[13px]"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.4 0H1.6V0.8H0.8V1.6H0V14.4H0.8V15.2H1.6V16H14.4V15.2H15.2V14.4H16V1.6H15.2V0.8H14.4V0ZM15.2 1.6H14.4V0.8H1.6V1.6H0.8V14.4H1.6V15.2H14.4V14.4H15.2V1.6Z"
                  fill="#3F3F3F"
                />
                <path
                  d="M12.8004 3.19984V2.39984H3.20039V3.19984H2.40039V12.7998H3.20039V13.5998H12.8004V12.7998H13.6004V3.19984H12.8004Z"
                  fill="#3F3F3F"
                />
              </svg>
            ) : (
              <svg
                className="absolute z-[0] bottom-[13px]"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.4 0H1.6V0.8H0.8V1.6H0V14.4H0.8V15.2H1.6V16H14.4V15.2H15.2V14.4H16V1.6H15.2V0.8H14.4V0ZM15.2 1.6H14.4V0.8H1.6V1.6H0.8V14.4H1.6V15.2H14.4V14.4H15.2V1.6Z"
                  fill="#3F3F3F"
                />
              </svg>
            )}
          </div>
          <input
            className="border-b border-[#a5a5a5] w-[269px] mr-[8px] focus:outline-none ml-[20px]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <svg
            className="cursor-pointer"
            onClick={!tutorial ? () => setAdd(false) : () => {}}
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
      </div>
    </div>
  );
};

export default TodoAdd;
