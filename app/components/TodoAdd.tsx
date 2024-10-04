"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
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
  initialData: TodoItem | null;
  tutorial?: boolean;
  val?: string;
  edit?: boolean;
  id?: number;
  getData: () => void;
}

const TodoAdd: React.FC<TodoAddProps> = ({
  setAdd,
  initialData,
  tutorial,
  edit,
  val,
  getData,
  id,
}) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState("bg-[#ff9b99]");
  const [inputValue, setInputValue] = useState("");
  const [click, setClick] = useState(false);

  const [todoState, setTodoState] = useState({
    selectedDays: [] as string[],
    selectedColor: "bg-[#ff9b99]",
    inputValue: "",
  });
  const ref = useRef<HTMLDivElement>(null);

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
    "bg-[#ba9edd]": "INDIGO",
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

  const initialDataRef = useRef(initialData);

  const [timeState, timeActions] = useTimePicker();

  useEffect(() => {
    if (initialData) {
      const { days, color, text, time } = initialData;

      setSelectedDays(days);
      setSelectedColor(`bg-[#${color}]`);
      setInputValue(text);

      // 시간 상태 업데이트
      const [h, m] = time.split(":");
      let newHours = parseInt(h, 10);
      let newMinutes = m.substring(0, 2);
      let newAmPm = "AM";

      if (newHours >= 12) {
        newAmPm = "PM";
        if (newHours > 12) newHours -= 12;
      }
      if (newHours === 0) {
        newHours = 12;
      }

      timeActions.setHours(newHours);
      timeActions.setMinutes(newMinutes);
      timeActions.setAmPm(newAmPm);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !tutorial
      ) {
        handleSubmit();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    tutorial,
    selectedDays.length,
    selectedColor,
    days,
    timeState,
    inputValue,
    timeActions,
  ]); // 필요한 의존성만 추가

  const handleCheckboxChange = useCallback(() => {
    setClick((prev) => !prev);
  }, []);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async () => {
    const hours =
      timeState.hours === 12
        ? timeState.amPm === "AM"
          ? "00"
          : "12"
        : timeState.amPm === "PM"
        ? (timeState.hours + 12).toString()
        : timeState.hours.toString().padStart(2, "0");

    try {
      const res = await instance.get("/user");

      const apiTodo: ApiTodoItem = {
        userId: res.data.userId,
        todoText: inputValue || todoState.inputValue,
        colorTag: colorToTag[selectedColor] || "RED",
        days: selectedDays.map((day) => dayToFull[day]),
        targetTime: `${hours}:${timeState.minutes}`,
      };

      if (edit) {
        instance.put(`/todolist/update/${id}`, apiTodo);
      } else await instance.post("/todolist/weekly", apiTodo);

      setTodoState({
        selectedDays: [],
        selectedColor: "bg-[#ff9b99]",
        inputValue: "",
      });
      setAdd(false);
    } catch (error) {
      console.error("Error submitting todo:", error);
    }
    getData();
  };

  return (
    <div
      ref={ref}
      className="w-[348px] mx-auto rounded-lg bg-[#FFFFFF] mt-[10px]"
    >
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
                className="absolute z-[0] bottom-[13px] cursor-pointer"
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
                className="absolute z-[0] bottom-[13px] cursor-pointer"
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

        <CustomTimePicker timeState={timeState} timeActions={timeActions} />

        <div className="flex space-x-2 mb-4">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-10 h-5 rounded-[5px] border-2 
        ${color}
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
