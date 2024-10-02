/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

export default function GochiModal({
  text,
  setModal,
  coin,
  button,
  buttonText,
}: any) {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[190] flex justify-center items-center"
      onClick={() => setModal(false)}
    >
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="330"
          height="160"
          viewBox="0 0 330 160"
          fill="none"
        >
          <rect width="330" height="160" fill="url(#pattern0_539_13958)" />
          <defs>
            <pattern
              id="pattern0_539_13958"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlinkHref="#image0_539_13958"
                transform="scale(0.0030303 0.00625)"
              />
            </pattern>
            <image
              id="image0_539_13958"
              width="330"
              height="160"
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUoAAACgCAYAAABqgSVVAAAACXBIWXMAAAsTAAALEwEAmpwYAAACsElEQVR4nO3ZsXEaURhG0X89dEQhCqQE2qAO2oBEClQINeFAXs8IW3MzY5tzop1H8qI73y7LfOF0Ol2/+g3gf7Tf75ffnX/70xcB+Nds1ofr9WNAns/n68zMy/PTna4EcCc/3qR3u90yM7MsHwPTogQIPxelJQk8urV/aw9nZpmxKAHSsv67bUkCfPb69j4zFiVAEkqAIJQAQSgBglACBKEECEIJEIQSIAglQBBKgCCUAEEoAYJQAgShBAhCCRCEEiAIJUAQSoAglABBKAGCUAIEoQQIQgkQhBIgCCVAEEqAIJQAQSgBglACBKEECEIJEIQSIAglQBBKgCCUAEEoAYJQAgShBAhCCRCEEiAIJUAQSoAglABBKAGCUAIEoQQIQgkQhBIgCCVAEEqAIJQAQSgBglACBKEECEIJEIQSIAglQBBKgCCUAEEoAYJQAgShBAhCCRCEEiAIJUAQSoAglABBKAGCUAIEoQQIQgkQhBIgCCVAEEqAIJQAQSgBglACBKEECEIJEIQSIAglQBBKgCCUAEEoAYJQAgShBAhCCRCEEiAIJUAQSoAglABBKAGCUAIEoQQIQgkQhBIgCCVAEEqAIJQAQSgBglACBKEECEIJEIQSIAglQBBKgCCUAEEoAYJQAgShBAhCCRCEEiAIJUAQSoAglABBKAGCUAIEoQQIQgkQhBIgCCVAEEqAIJQAQSgBglACBKEECEIJEIQSIAglQBBKgCCUAEEoAYJQAgShBAhCCRCEEiAIJUAQSoAglABBKAGCUAIEoQQIQgkQNpfL5dPBy/PTna4C8Hd4fXufmZm1jxYlQFjWh8PhcJ2Z2W63M2NZAo/ndkkej8dlxqIESJvbg9tvlgCP4qv+WZQAYbk9WL9VAjyq9dvkyqIECL8sypVlCTya2yW5sigBwnfhZDvng8Gd6QAAAABJRU5ErkJggg=="
            />
          </defs>
        </svg>
        <div
          className="w-[200px] font-neodunggeunmo absolute top-[20px] left-[80px] flex justify-center items-center"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {text}
        </div>
        {coin > 0 && (
          <div
            className={`flex absolute top-[60px] ${
              buttonText === "REVIVE" ? "left-[120px]" : "left-[150px]"
            } `}
          >
            {buttonText === "REVIVE" && (
              <div className="mr-[5px]">부활하기</div>
            )}
            <img src="coin.svg" alt="coin" />
            <div className="ml-[5px]">{coin}</div>
          </div>
        )}
      </div>
      {button > 1 ? (
        <div className="flex absolute left-[50%] top-[50%] transform -translate-x-[50%] translate-y-[40%] gap-[10px]">
          <div
            className="relative"
            onClick={
              buttonText !== "REVIVE" ? () => {} : () => setClicked(true)
            }
          >
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="140"
              height="35"
              viewBox="0 0 140 35"
              fill="none"
            >
              <path
                d="M136 0H4V1H2V2H1V4H0V31H1V33H2V34H4V35H136V34H138V33H139V31H140V4H139V2H138V1H136V0Z"
                fill="#3F3F3F"
              />
            </svg>
            {buttonText === "YES" && (
              <div className="absolute z-[2] flex justify-center items-center text-white bottom-[10px] left-[46px]">
                아니야!
              </div>
            )}
            {buttonText === "REVIVE" && (
              <div className="absolute z-[2] flex justify-center items-center text-white bottom-[10px] left-[46px]">
                부활하기
              </div>
            )}
          </div>
          <div className="relative">
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="140"
              height="35"
              viewBox="0 0 140 35"
              fill="none"
            >
              <path
                d="M136 0H4V1H2V2H1V4H0V31H1V33H2V34H4V35H136V34H138V33H139V31H140V4H139V2H138V1H136V0Z"
                fill="#3F3F3F"
              />
            </svg>
            {buttonText === "YES" && (
              <div className="absolute flex z-[2] justify-center items-center text-white bottom-[10px] left-[60px]">
                네!
              </div>
            )}
            {buttonText === "REVIVE" && (
              <div className="absolute z-[2] flex justify-center items-center text-white bottom-[10px] left-[46px]">
                새로 시작
              </div>
            )}
          </div>
        </div>
      ) : (
        <svg
          className="absolute left-[50%] top-[50%] transform -translate-x-[50%] translate-y-[40%] cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="280"
          height="35"
          viewBox="0 0 280 35"
          fill="none"
        >
          <path
            d="M276 0H4V1H2V2H1V4H0V31H1V33H2V34H4V35H276V34H278V33H279V31H280V4H279V2H278V1H276V0Z"
            fill="#3F3F3F"
          />
        </svg>
      )}
    </div>
  );
}
