/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

export default function Controls({
  status,
  feed,
  pet,
  walkModal,
  cureModal,
}: any) {
  return (
    <div className="absolute flex justify-center items-center left-[7px] bottom-[10px] z-[102]">
      <div className="flex space-x-[8px]">
        {status.level === "egg" || status.health_status === "dead" ? (
          <div className="relative">
            <img src="/disableButton.png" alt="button" />
            <img
              className="absolute z-[2] top-[2px] left-[21px]"
              src="/food.png"
              alt="button"
            />
          </div>
        ) : (
          <div className="relative cursor-pointer" onClick={feed}>
            <img src="/button.png" alt="button" />
            <img
              className="absolute z-[2] top-[2px] left-[21px]"
              src="/food.png"
              alt="button"
            />
          </div>
        )}
        {status.health_status == "dead" ? (
          <div className="relative">
            <img src="/disableButton.png" alt="button" />
            <img
              className="absolute z-[2] top-[2px] left-[21px]"
              src="/cute.png"
              alt="button"
            />
          </div>
        ) : (
          <div className="relative cursor-pointer" onClick={pet}>
            <img src="/button.png" alt="button" />
            <img
              className="absolute z-[2] top-[2px] left-[21px]"
              src="/cute.png"
              alt="button"
            />
          </div>
        )}

        {status.level === "egg" || status.health_status == "dead" ? (
          <div className="relative ">
            <img src="/disableButton.png" alt="button" />
            <img
              className="absolute z-[2] top-[2px] left-[21px]"
              src="/go.png"
              alt="disableButton"
            />
          </div>
        ) : (
          <div className="relative cursor-pointer" onClick={walkModal}>
            <img src="/button.png" alt="button" />
            <img
              className="absolute z-[2] top-[2px] left-[21px]"
              src="/go.png"
              alt="button"
            />
          </div>
        )}

        <div
          className={`relative ${
            status.health_status === "sick" ? "cursor-pointer" : ""
          } `}
          onClick={status.health_status !== "sick" ? () => {} : cureModal}
        >
          {status.health_status === "sick" ? (
            <img src="/button.png" alt="button" />
          ) : (
            <img src="/disableButton.png" alt="button" />
          )}

          <img
            className="absolute z-[2] top-[2px] left-[21px]"
            src="/fix.png"
            alt="button"
          />
        </div>
      </div>
    </div>
  );
}
