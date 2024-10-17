/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Header from "./Header";

export default function Character({
  status,
  character,
  message,
  timeLeft,
  walking,
  totalCoin,
  day,
}: any) {
  return (
    <>
      {walking ? (
        <img src="/back.gif" className="absolute z-1" alt="room" />
      ) : (
        <img src="/room.png" className="absolute z-1" alt="room" />
      )}

      <Header
        totalCoin={totalCoin}
        day={day}
        hunger={status.hunger}
        happiness={status.happiness}
      />

      {status.level === "egg" && (
        <div>
          <div className="absolute z-[101] top-[110px] left-[130px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="35"
              viewBox="0 0 100 35"
              fill="none"
            >
              <path
                d="M96 0H4V1H2V2H1V4H0V31H1V33H2V34H4V35H96V34H98V33H99V31H100V4H99V2H98V1H96V0Z"
                fill="#FAFAFA"
              />
              <rect x="6" y="2" width="88" height="1" fill="#D8D8D8" />
              <rect x="6" y="32" width="88" height="1" fill="#D8D8D8" />
            </svg>
            <div className="font-neodunggeunmo absolute z-[130] top-[12px] left-[30px] flex justify-center items-center">
              {timeLeft.hour && String(timeLeft.hour).padStart(2, "0")}:
              {String(timeLeft.min).padStart(2, "0")}:
              {timeLeft.min < 1 && String(timeLeft.sec).padStart(2, "0")}
            </div>
          </div>
          {timeLeft.hour === 0 && timeLeft.min === 0 ? (
            <img
              className="absolute z-[103] bottom-[60px] left-[120px]"
              src="/egg_cracking.gif"
              alt="egg"
            />
          ) : (
            <img
              className="absolute z-[103] bottom-[60px] left-[120px]"
              src="/egg_default.gif"
              alt="egg"
            />
          )}
        </div>
      )}

      {status.level === "baby" && (
        <img
          src={character !== "" ? character : "/step1_default.gif"}
          alt="baby"
          className="absolute z-[103] bottom-[60px] left-[120px]"
        />
      )}

      {status.level === "adult" && (
        <img
          src={character !== "" ? character : "/step2_default.gif"}
          alt="adult"
          className="absolute z-[103] bottom-[60px] left-[120px]"
        />
      )}

      {message !== "" && (
        <div className="absolute z-[135] top-1/2 -translate-y-[185%] w-[80%] max-w-[300px] translate-x-[11%]">
          <div className="relative">
            <img src="speech.png" className="w-full h-auto" alt="speech" />
            <svg
              className="absolute bottom-[12px] right-[5%] animate-fade"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="8"
              viewBox="0 0 15 8"
              fill="none"
            >
              <path
                d="M15 1L15 0L0 -6.55671e-07L-4.37114e-08 0.999999L1 0.999999L1 2L2 2L2 3L3 3L3 4L4 4L4 5L5 5L5 6L6 6L6 7L7 7L7 8L8 8L8 7L9 7L9 6L10 6L10 5L11 5L11 4L12 4L12 3L13 3L13 2L14 2L14 1L15 1Z"
                fill="#737373"
              />
            </svg>
            <div className="font-neodunggeunmo text-[12px] absolute top-[50%] left-[20px] transform -translate-y-1/2 w-[calc(100%-40px)]">
              {message}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
