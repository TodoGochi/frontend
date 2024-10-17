"use client";

import React, { useState, useEffect, useRef } from "react";
import CustomTimePicker from "./TimePicker";
import { useTimePicker } from "../hooks/timepicker";
import { instance } from "../utils/axios";
import { useStore } from "../store/date";

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
  setModal3?: (args: boolean) => void;
  initialInputValue: string;
  setInitialInputValue: (args: string) => void;
}

const TodoAdd: React.FC<TodoAddProps> = ({
  setAdd,
  initialData,
  tutorial,
  edit,
  val,
  getData,
  id,
  setModal3,
  initialInputValue,
  setInitialInputValue,
}) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState("bg-[#ff9b99]");
  const [inputValue, setInputValue] = useState(initialInputValue || "");
  const [click, setClick] = useState(false);

  const selectedDate = useStore((state) => state.selectedDate);

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

  const [timeState, timeActions] = useTimePicker();

  useEffect(() => {
    if (initialData?.time) {
      const [hours, minutes] = initialData.time.split(":");
      timeActions.setHours(hours);
      timeActions.setMinutes(minutes);
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
    selectedDays,
    selectedColor,
    timeState,
    inputValue,
    initialInputValue,
  ]);

  const handleCheckboxChange = async () => {
    setClick(!click);
    const res: any = await instance.get("/user");

    if (id) {
      const postRes: any = await instance.post(
        `todolist/complete/${res.data.userId}/${id}`
      );
      if (postRes.data.rewardCoin === 3) {
        setModal3 && setModal3(true);
      }
    }
    getData();
  };

  const formatDateToYYYYMMDD = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}${month}${day}`;
  };

  const getDataClicked = async () => {
    if (id) {
      const res = await instance.get("/user");
      const todoListRes = await instance.get(
        `/todolist/${res.data.userId}/${parseInt(
          formatDateToYYYYMMDD(selectedDate as Date)
        )}`
      );
      setClick(
        !!todoListRes.data.filter((el: any) => el.todoId === id)[0].status
      );
    }
  };

  useEffect(() => {
    getDataClicked();
  }, [id, selectedDate]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async () => {
    setInitialInputValue("");

    const formattedHours = (() => {
      if (timeState.hours === null) return "00";
      if (timeState.hours === "12")
        return timeState.amPm === "AM" ? "00" : "12";
      if (timeState.amPm === "PM")
        return (parseInt(timeState.hours) + 12).toString().padStart(2, "0");
      return timeState.hours.toString().padStart(2, "0");
    })();

    const formattedMinutes =
      timeState.minutes === null
        ? "00"
        : timeState.minutes.toString().padStart(2, "0");

    const formattedTime = `${formattedHours}:${formattedMinutes}`;

    console.log(formattedTime);

    try {
      const res = await instance.get("/user");

      const commonTodoData = {
        userId: res.data.userId,
        todoText: inputValue,
        colorTag: colorToTag[selectedColor] || "GRAY",
        targetTime: formattedTime,
      };

      if (selectedDays.length === 0 && !edit) {
        await instance.post("/todolist/specific-day", {
          ...commonTodoData,
          targetDate: parseInt(formatDateToYYYYMMDD(selectedDate as Date)),
        });
      } else {
        const apiTodo: ApiTodoItem = {
          ...commonTodoData,
          days: selectedDays.map((day) => dayToFull[day]),
          colorTag: colorToTag[selectedColor] || "RED",
        };

        if (edit) {
          await instance.put(`/todolist/update/${id}`, apiTodo);
        } else {
          await instance.post("/todolist/weekly", apiTodo);
        }
      }

      setAdd(false);
    } catch (error) {
      console.error("Error submitting todo:", error);
    }
    getData();
  };

  return (
    <div>
      <div
        ref={ref}
        className="w-[350px] rounded-lg bg-[#FFFFFF] mt-[10px] flex items-center"
      >
        <div
          className={`min-w-[5px] h-[200px] ${selectedColor} rounded-tl-[5px] rounded-bl-[5px]`}
        ></div>
        <div className="p-4 pt-[10px] pb-[10px] h-[200px]">
          <div className="flex mb-[20px] mt-[5px]">
            <div className="relative w-[10px]">
              <input
                type="checkbox"
                className="absolute z-[1] mr-3 opacity-0 bottom-[5px]"
                onChange={handleCheckboxChange}
              />
              {click ? (
                <svg
                  className="absolute z-[0] bottom-[5px] cursor-pointer"
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
                  className="absolute z-[0] bottom-[5px] cursor-pointer"
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
              className="border-b border-[#a5a5a5] w-[250px] font-suit mr-[3px] focus:outline-none ml-[20px]"
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
                className={`text-[10px] max-w-[35px] px-[7px] py-[5px] rounded font-suit ${
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

          <div className="flex gap-[3px]">
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
    </div>
  );
};

export default TodoAdd;
