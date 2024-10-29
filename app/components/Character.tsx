/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Header from "./Header";
import { CharacterStatus, TimeLeft } from "../types/types";
import MessageBubble from "./BubbleMessage";

interface CharacterProps {
  status: CharacterStatus;
  character: string;
  message: string;
  timeLeft: TimeLeft;
  walking: boolean;
  totalCoin: number;
  day: number;
}

export default function Character({
  status,
  character,
  message,
  timeLeft,
  walking,
  totalCoin,
  day,
}: CharacterProps) {
  const { hour, min, sec } = timeLeft;

  const renderBackground = () => (
    <img
      src={walking ? "/back.gif" : "/room.png"}
      className="absolute z-1"
      alt="room"
    />
  );

  const renderTimer = () => (
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
      <div className="font-neodunggeunmo absolute z-[130] top-[12px] left-[20px] flex justify-center items-center">
        {hour ? String(hour).padStart(2, "0") : "00"}:
        {String(min).padStart(2, "0")}
        {":" + String(sec).padStart(2, "0")}
      </div>
    </div>
  );

  const renderCharacter = () => {
    let src = character || "";
    if (status.level === "egg") {
      src = "/egg_default.gif";
    } else if (status.level === "adult" && !character) {
      src = "/step2_default.gif";
    } else if (status.level === "baby" && !character) {
      src = "/step1_default.gif";
    }

    return (
      <img
        src={src}
        alt={status.level}
        className="absolute z-[103] bottom-[60px] left-[120px]"
      />
    );
  };

  return (
    <>
      {renderBackground()}
      <Header
        totalCoin={totalCoin}
        day={day}
        hunger={status.hunger}
        happiness={status.happiness}
      />
      {status.level === "egg" && renderTimer()}
      {renderCharacter()}
      <MessageBubble message={message} />
    </>
  );
}
