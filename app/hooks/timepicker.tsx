import { useState, useRef, useEffect, useCallback } from "react";

interface TimePickerState {
  amPm: string;
  hours: string;
  minutes: string;
}

interface TimePickerActions {
  toggleAmPm: () => void;
  handleHoursChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMinutesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setAmPm: React.Dispatch<React.SetStateAction<string>>;
  setHours: React.Dispatch<React.SetStateAction<string>>;
  setMinutes: React.Dispatch<React.SetStateAction<string>>;
  formatHours: (args: string) => void;
  formatMinutes: (args: string) => void;
}

export function useTimePicker(
  initialState: TimePickerState = {
    amPm: "AM",
    hours: "10",
    minutes: "00",
  }
): [TimePickerState, TimePickerActions] {
  const [amPm, setAmPm] = useState(initialState.amPm);
  const [hours, setHours] = useState(
    (parseInt(initialState.hours) % 12).toString()
  );
  const [minutes, setMinutes] = useState(initialState.minutes);

  const toggleAmPm = useCallback(() => {
    setAmPm((prev) => (prev === "PM" ? "AM" : "PM"));
  }, []);

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // 숫자만 허용

    if (value.length > 2) {
      value = value.slice(0, 2);
    }

    const numValue = parseInt(value);
    if (numValue > 12) {
      value = "12";
    } else if (value.length === 2 && numValue === 0) {
      value = "01";
    }

    setHours(value);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // 숫자만 허용

    if (value.length > 2) {
      value = value.slice(0, 2);
    }

    const numValue = parseInt(value);
    if (numValue > 59) {
      value = "59";
    }

    setMinutes(value);
  };

  const formatHours = (value: string) => {
    let numValue = parseInt(value);
    if (isNaN(numValue) || numValue === 0) return "01";
    if (numValue > 12) return "12";
    return value.padStart(2, "0");
  };

  const formatMinutes = (value: string) => {
    let numValue = parseInt(value);
    if (isNaN(numValue)) return "00";
    if (numValue > 59) return "59";
    return value.padStart(2, "0");
  };

  return [
    {
      amPm,
      hours,
      minutes,
    },
    {
      toggleAmPm,
      handleHoursChange,
      handleMinutesChange,
      setAmPm,
      setHours,
      setMinutes,
      formatHours,
      formatMinutes,
    },
  ];
}
