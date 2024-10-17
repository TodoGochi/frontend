/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import WeekCalendar from "@/app/components/WeekCalendar";
import MonthCalendar from "@/app/components/MonthCalendar";
import SwipeActionList from "@/app/components/Task";

export default function TaskList({
  sized,
  setSized,
  month,
  setMonth,
  todayCoin,
}: any) {
  const [isSortedByColor, setIsSortedByColor] = useState(false);

  return (
    <div
      className={`w-[390px] max-xs:w-full ${
        sized
          ? "max-h-[749px] absolute top-[50px] t z-[130] overflow-auto"
          : "min-h-[369px]"
      } bg-[#f4f4f4] rounded-tl-[30px] rounded-tr-[30px] flex flex-col justify-start items-center pt-[10px] mt-[20px]`}
    >
      <img
        className="cursor-pointer"
        src="/union.png"
        alt="union"
        onClick={() => setSized(!sized)}
      />
      {!month && <WeekCalendar month={month} setMonth={setMonth} />}
      {month && <MonthCalendar month={month} setMonth={setMonth} />}
      <div className="w-full px-[30px] flex justify-between font-neodunggeunmo items-center mb-[15px] mt-[30px]">
        <div className="flex text-[12px] items-center">
          <img src="/coin.svg" alt="coin" />
          <span className="ml-[5px]">Today Coin</span>
          <span className="ml-[5px]">{todayCoin}</span>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setIsSortedByColor(!isSortedByColor)}
        >
          <img src="list.svg" alt="sort" />
          <span className="ml-[5px] text-[12px] font-suit min-w-[55px]">
            {isSortedByColor ? "최신 순" : "컬러태그 순"}
          </span>
        </div>
      </div>
      <SwipeActionList sized={sized} isSortedByColor={isSortedByColor} />
    </div>
  );
}
