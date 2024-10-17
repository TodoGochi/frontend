/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import HungerMeter from "@/app/components/EnergyBar";

export default function Header({ totalCoin, day, hunger, happiness }: any) {
  return (
    <div className="inset-0 flex items-start justify-center absolute z-[101] top-[10px]">
      <div className="relative flex flex-col justify-center items-center">
        <div className="flex items-center">
          <img src="/coin.svg" alt="coin" />
          <span className="font-neodunggeunmo mr-[13px] ml-[3px]">
            {totalCoin}
          </span>
          <span className="font-neodunggeunmo mr-[8px]">Day {day}</span>
          <HungerMeter hunger={hunger} />

          {Array.from({ length: Math.floor(happiness / 2) }, (_, index) => (
            <img
              key={index}
              src="/heart.png"
              alt={`Repeated image ${index + 1}`}
            />
          ))}
          {Array.from({ length: happiness % 2 }, (_, index) => (
            <img
              key={index}
              src="/heartHalf.png"
              alt={`Repeated image ${index + 1}`}
            />
          ))}
          {Array.from(
            {
              length: 5 - (Math.floor(happiness / 2) + (happiness % 2)),
            },
            (_, index) => (
              <img
                key={index}
                src="/emptyHeart.png"
                alt={`Repeated image ${index + 1}`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
