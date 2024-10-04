/* eslint-disable @next/next/no-img-element */
// CustomTimePicker.tsx
import React from "react";

interface TimePickerState {
  amPm: string;
  hours: number;
  minutes: string;
}

interface TimePickerActions {
  toggleAmPm: () => void;
  handleHoursChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMinutesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  const { toggleAmPm, handleHoursChange, handleMinutesChange } = timeActions;

  return (
    <div className="flex items-center p-3 rounded-md ml-[50px] mb-[10px]">
      <img src="/clock.svg" alt="clock" className="mr-[10px]" />
      <button
        onClick={toggleAmPm}
        className="bg-gray-100 px-[10px] text-lg rounded-md shadow-sm hover:bg-gray-200 focus:outline-none text-[12px] mr-[5px]"
      >
        {amPm}
      </button>
      <input
        type="number"
        value={hours}
        onChange={handleHoursChange}
        className="max-w-[55px] text-lg text-center bg-gray-100 outline-none flex justify-center items-center appearance-none no-spinner"
        min="1"
        max="12"
      />
      <span className="mx-2 text-lg">:</span>
      <input
        type="number"
        value={minutes}
        onChange={handleMinutesChange}
        className="max-w-[55px] text-lg text-center bg-gray-100 outline-none flex justify-center items-center appearance-none no-spinner"
        min="0"
        max="59"
      />
      <style jsx>{`
        .no-spinner::-webkit-outer-spin-button,
        .no-spinner::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .no-spinner {
          -moz-appearance: textfield; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default CustomTimePicker;
