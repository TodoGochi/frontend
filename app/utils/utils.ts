// utils.ts

import { CharacterStatus, TimeLeft } from "../types/types";

export function calculateDaysSinceCreation(userData: CharacterStatus): number {
  const createdAt = new Date(userData.created_at);
  const today = new Date();

  const createdAtUTC = Date.UTC(
    createdAt.getFullYear(),
    createdAt.getMonth(),
    createdAt.getDate()
  );
  const todayUTC = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((todayUTC - createdAtUTC) / millisecondsPerDay);
}

export function trackCoins(
  createdAtStr: string,
  changeAmount: number,
  setTodayCoin: (value: number | ((prevVar: number) => number)) => void
): void {
  const createdAt = new Date(createdAtStr);
  const today = new Date();

  const createdAtKST = new Date(createdAt.getTime() + 9 * 60 * 60 * 1000);
  const todayKST = new Date(today.getTime() + 9 * 60 * 60 * 1000);

  createdAtKST.setUTCHours(0, 0, 0, 0);
  todayKST.setUTCHours(0, 0, 0, 0);

  const daysDiff = Math.floor(
    (todayKST.getTime() - createdAtKST.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff === 0 && changeAmount > 0) {
    setTodayCoin((prev) => prev + changeAmount);
  }
}

export function decrementTime(prevTime: TimeLeft): TimeLeft {
  let { hour, min, sec } = prevTime;

  if (sec > 0) {
    sec--;
  } else if (min > 0) {
    min--;
    sec = 59;
  } else if (hour > 0) {
    hour--;
    min = 59;
    sec = 59;
  }

  return { hour, min, sec };
}
