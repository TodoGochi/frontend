// useTimePicker.ts
import { useState } from "react";

interface TimePickerState {
  amPm: string;
  hours: number;
  minutes: string;
}

interface TimePickerActions {
  toggleAmPm: () => void;
  handleHoursChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMinutesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setAmPm: React.Dispatch<React.SetStateAction<string>>;
  setHours: React.Dispatch<React.SetStateAction<number>>;
  setMinutes: React.Dispatch<React.SetStateAction<string>>;
}

export function useTimePicker(
  initialState: TimePickerState = { amPm: "AM", hours: 10, minutes: "00" }
): [TimePickerState, TimePickerActions] {
  const [amPm, setAmPm] = useState(initialState.amPm);
  const [hours, setHours] = useState(initialState.hours);
  const [minutes, setMinutes] = useState(initialState.minutes);

  const toggleAmPm = () => {
    setAmPm((prev) => (prev === "AM" ? "PM" : "AM"));
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Math.max(1, Math.min(12, Number(e.target.value)));
    setHours(value);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Math.max(0, Math.min(59, Number(e.target.value)));
    setMinutes(value.toString().padStart(2, "0"));
  };

  return [
    { amPm, hours, minutes },
    {
      toggleAmPm,
      handleHoursChange,
      handleMinutesChange,
      setAmPm,
      setHours,
      setMinutes,
    },
  ];
}
