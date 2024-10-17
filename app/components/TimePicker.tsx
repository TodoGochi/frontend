"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";

interface TimePickerState {
  amPm: string;
  hours: string;
  minutes: string;
}

interface TimePickerActions {
  toggleAmPm: () => void;
  handleHoursChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMinutesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatHours: (args: string) => void;
  formatMinutes: (args: string) => void;
}

interface CustomTimePickerProps {
  timeState: TimePickerState;
  timeActions: TimePickerActions;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  timeState,
  timeActions,
}) => {
  const { amPm, hours, minutes } = timeState;
  const {
    toggleAmPm,
    handleHoursChange,
    handleMinutesChange,
    formatHours,
    formatMinutes,
  } = timeActions;

  return (
    <div className="flex items-center p-3 rounded-md ml-[50px] mb-[10px]">
      <img src="/clock.svg" alt="clock" className="mr-[10px]" />
      <button
        onClick={toggleAmPm}
        className="bg-gray-100 px-[10px] w-[45px] h-[24px] rounded-tl-[5px] rounded-bl-[5px] shadow-sm hover:bg-gray-200 focus:outline-none text-[12px] mr-[5px] font-suit"
      >
        {amPm}
      </button>
      <input
        type="text"
        value={hours}
        onChange={handleHoursChange}
        onBlur={() => formatHours(hours)}
        className="max-w-[55px] text-[12px] text-center w-[45px] h-[24px] bg-gray-100 outline-none font-suit flex justify-center items-center"
        maxLength={2}
      />
      <span className="mx-2 text-lg font-suit">:</span>
      <input
        type="text"
        value={minutes}
        onBlur={() => formatMinutes(minutes)}
        onChange={handleMinutesChange}
        className="max-w-[55px] text-[12px] text-center w-[45px] h-[24px] bg-gray-100 outline-none font-suit flex justify-center items-center rounded-tr-[5px] rounded-br-[5px]"
        maxLength={2}
      />
    </div>
  );
};

export default CustomTimePicker;
