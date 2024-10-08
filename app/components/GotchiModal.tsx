/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { instance } from "../utils/axios";

export default function GochiModal({
  text,
  setModal,
  coin,
  button,
  buttonText,
  revive,
  restart,
  cure,
  which,
}: any) {
  const [clicked, setClicked] = useState(false);
  const [whichClicked, setWhichClicked] = useState("");
  const [modalText, setModalText] = useState("");

  const restartModal = async () => {
    const res = await instance.get("/user");
    const resGotchi = await instance.get(
      `/tamagotchi/${res.data.userId}/status`
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[190] flex justify-center items-center"
      onClick={() => setModal(false)}
    >
      <div
        className="absolute left-[50%] top-[50%] transform -translate-x-[50%] w-[330px] h-[160px] -translate-y-[50%]  flex flex-col p-[20px]"
        onClick={(e) => e.stopPropagation()}
      >
        <svg
          className="absolute z-[1] left-0 top-0"
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
          className=" font-neodunggeunmo relative z-[101] flex justify-center items-center mb-[15px] "
          style={{ whiteSpace: "pre-wrap" }}
        >
          <span className="leading-5">{text}</span>
        </div>
        {coin !== 0 ? (
          <div
            className={`flex relative justify-center items-center z-[101] mb-[15px] font-neodunggeunmo`}
          >
            {buttonText === "REVIVE" && (
              <div className="mr-[5px]">
                {which === "cure"
                  ? "치료하기"
                  : which === "coin"
                  ? ""
                  : "부활하기"}
              </div>
            )}
            <img src="coin.svg" alt="coin" />
            <div className="ml-[5px]">{coin}</div>
          </div>
        ) : (
          <div className="mb-[15px]"></div>
        )}

        {button > 1 ? (
          <div className="flex relative gap-[10px] justify-center items-center">
            <div
              className="w-[140px] relative flex justify-center items-center h-full"
              onClick={
                buttonText !== "REVIVE" ? () => {} : () => setClicked(true)
              }
            >
              <svg
                className="cursor-pointer absolute z-[2] left-[0px] top-[0px]"
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
              {whichClicked !== "" && (
                <div
                  className="relative z-[3] flex justify-center items-center text-white h-full font-neodunggeunmo cursor-pointer"
                  onClick={() => setWhichClicked("")}
                >
                  아니야!
                </div>
              )}
              {whichClicked === "" && buttonText === "REVIVE" && (
                <div
                  className="relative z-[3] flex justify-center items-center text-white h-full font-neodunggeunmo cursor-pointer"
                  onClick={() => setWhichClicked("revive")}
                >
                  부활하기
                </div>
              )}
            </div>
            <div className="relative w-[140px] h-[35px]  justify-center items-center">
              <svg
                className="cursor-pointer absolute z-[2] left-[0px] top-[0px]"
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
              {whichClicked !== "" && (
                <div
                  className="relative flex z-[3] justify-center items-center text-white h-full font-neodunggeunmo cursor-pointer"
                  onClick={whichClicked === "revive" ? revive : restart}
                >
                  네!
                </div>
              )}
              {buttonText === "REVIVE" && (
                <div
                  className="relative z-[3] flex justify-center items-center text-white h-full font-neodunggeunmo cursor-pointer"
                  onClick={() => setWhichClicked("restart")}
                >
                  새로 시작
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className="relative flex justify-center items-center h-[35px] cursor-pointer"
            onClick={
              which == "cure"
                ? cure
                : () => {
                    setModal(false);
                  }
            }
          >
            <svg
              className="absolute z-[2] left-[8px] top-[20px] cursor-pointer"
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
            <div className="relative z-[3] h-full text-white font-neodunggeunmo flex justify-center items-center mt-[40px]">
              {which === "cure" ? "치료하기" : "확인"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
