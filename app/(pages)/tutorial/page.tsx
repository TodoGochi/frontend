/* eslint-disable @next/next/no-img-element */
"use client";

import Modal from "@/app/components/Modal";
import MonthCalendar from "@/app/components/MonthCalendar";
import TutorialTask from "@/app/components/TutorialTask";
import WeekCalendar from "@/app/components/WeekCalendar";
import { instance } from "@/app/utils/axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";

const tutorialSteps = [
  {
    title: "Step 1",
    content:
      "안녕, 나는 너와 함께할 다마고치야.\n 지금부터 투두고치를 설명해 줄게.",
  },
  { title: "Step 2", content: "우리는 총 세 단계로 성장해." },
  {
    title: "Step3",
    content:
      "얘는 쓰다듬기만 할 수 있어. \n 그러다보면 어느 순간 알에서 깨어나.",
  },
  {
    title: "Step 4",
    content:
      "알에서 깨어나면 아기 강아지 상태가 돼. \n 열심히 밥주고 쓰다듬고 산책시켜주면,",
  },
  {
    title: "Step 4",
    content: "짜잔-! 내가 되지롱.",
  },
  {
    title: "Step 4",
    content: "그리고 나머지 다마고치 기능들을 설명해줄게.",
  },
  {
    title: "Step 4",
    content:
      "왼쪽부터 순서대로 코인, 함께한 일 수, \n 배고픔 게이지, 행복도 게이지야.",
  },
  {
    title: "Step 4",
    content:
      "코인은 투두를 완료하면 얻을 수 있어. \n 산책에서 가끔씩 발견할 수 있으니까 참고해.",
  },
  {
    title: "Step 4",
    content:
      "함께한 일 수는 다마고치가 태어난 날\n 이후부터 카운팅 시작이야. 잘 키워 보라고~",
  },
  {
    title: "Step 4",
    content:
      "배고픔 게이지는 먹이주기, 행복도 게이지는 \n 쓰다듬기랑 산책으로 채울 수 있어.",
  },
  {
    title: "Step 4",
    content: "이제 하단 버튼들을 설명해 줄게. ",
  },
  {
    title: "Step 4",
    content: "왼쪽부터 먹이주기, 쓰다듬기, 산책하기, \n 치료하기야.",
  },
  {
    title: "Step 4",
    content:
      "먹이주기와 산책하기는 1코인을 사용해야하고\n,  쓰다듬기는 꽁짜야!ㅎㅎ 많이많이 해줘.",
  },
  {
    title: "Step 4",
    content:
      "치료하기는 다마고치가 아플 때만 가능해. \n 밥 안주면 아프니까 되도록 쓸 일 없도록 해.",
  },
  {
    title: "Step 4",
    content: "투두리스트도 간단히 설명해줄게.",
  },
  {
    title: "Step 4",
    content:
      "‘할 일 추가'를 누르면 작성 할 수 있어. \n 오른쪽 ‘+’버튼을 누르면 상세설정이 가능해.",
  },
  {
    title: "Step 4",
    content:
      "‘할 일 추가'를 누르면 작성 할 수 있어. \n 오른쪽 ‘+’버튼을 누르면 상세설정이 가능해.",
  },
  {
    title: "Step 4",
    content: "컬러태그를 설정하고, 요일 별 반복도 \n설정할 수   있어. ",
  },

  {
    title: "Step 4",
    content:
      "작성한 후에 화면 아무 곳이나 터치하면 작성 \n이 완료되니까 이 점 알아둬.",
  },

  {
    title: "Step 4",
    content: "각 컬러태그의 할 일을 모두 완수해야 1코인을 \n받을 수 있고,",
  },
  {
    title: "Step 4",
    content:
      "모든 컬러태그를 완료 시에는 2개의 보너스 \n코인을 지급하니까 꼭 모두 완수해 봐..",
  },
  {
    title: "Step 4",
    content:
      "나머지는 눌러 봐... 말을 너무 많이했더니 \n 배고파. 이제 새친구를 줄테니까 이름 지어줘.",
  },
];

const TextWithBreaks = ({ content }: any) => (
  <div>
    {content.split("\n").map((line: any, i: any) => (
      <React.Fragment key={i}>
        {line}
        {i < content.split("\n").length - 1 && (
          <p className="h-[5px]">
            <br />
          </p>
        )}
      </React.Fragment>
    ))}
  </div>
);

export default function Page() {
  const router = useRouter();

  const [month, setMonth] = useState(false);
  const [sized, setSized] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [modal, setModal] = useState(false);

  const [nickname, setNickname] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const goToNextStep = () => {
    if (currentStep === 19) {
      setModal(true);
    }
    setCurrentStep(currentStep + 1);
  };

  const makeGochi = async () => {
    const res = await instance.get("/user");
    try {
      instance.post("/tamagotchi/create", {
        userId: res.data.userId,
        nickname,
      });
      router.push("/main");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-auto">
      <div className="bg-neutral-700 flex items-center justify-center min-h-screen h-full w-screen max-xs:w-full max-xs:h-full relative flex-col">
        <div
          className={`relative w-[360px] mt-[30px] h-[300px] ${
            sized ? "z-[129]" : ""
          }`}
        >
          {isClient && currentStep <= 21 && (
            <div
              className={`absolute  ${
                currentStep === 6 ? "z-[129]" : "z-[130]"
              } min-w-[360px] h-[300px] ${
                currentStep >= 14 ? "" : " bg-[#00000080]/50"
              }  rounded-2xl flex flex-col justify-center items-center`}
            >
              <div
                onClick={goToNextStep}
                className="cursor-pointer absolute z-[135] top-1/2 -translate-y-[185%] w-[80%] max-w-[300px]"
              >
                <div className="relative">
                  <img
                    src="speech.png"
                    className="w-full h-auto"
                    alt="speech"
                  />
                  <svg
                    className="absolute bottom-[12px] right-[5%]"
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
                    <TextWithBreaks
                      content={tutorialSteps[currentStep].content}
                    />
                  </div>
                </div>
              </div>

              {currentStep >= 1 && currentStep <= 5 ? (
                <div className="flex">
                  {currentStep === 1 || currentStep === 2 ? (
                    <img src="/egg_default.gif" alt="egg" />
                  ) : (
                    <>
                      <img
                        src="/egg_default.gif"
                        alt="egg"
                        className="opacity-50"
                      />
                    </>
                  )}
                  {currentStep === 4 || currentStep === 5 ? (
                    <img
                      src="/step1_default.gif"
                      className="opacity-50"
                      alt="baby"
                    />
                  ) : (
                    <img src="/step1_default.gif" alt="baby" />
                  )}

                  <img src="/step2_default.gif" alt="dog" />
                </div>
              ) : (
                <div className="mt-4 w-[60%] max-w-[120px]">
                  <img
                    src="/step2_talking.gif"
                    alt="dog"
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>
          )}

          {isClient && currentStep === 20 && modal && (
            <Modal
              id={0}
              items={[]}
              getData={() => {}}
              tutorial={true}
              setModal={setModal}
              text={`할 일을 전부 완료했어요!
보너스 코인을 드릴게요.`}
            />
          )}

          {isClient && currentStep >= 22 && (
            <div className="absolute z-[130] w-[360px] h-full bg-[#00000080]/50 rounded-2xl left-0">
              <div className="absolute z-[131] w-[330px] h-[160px] left-[4%] top-[20%]">
                <img
                  className="z-[131] w-[330px] h-[160px]"
                  src="/popup.png"
                  alt="popup"
                />
              </div>
              <div className="absolute z-[131] top-[28%] left-[21%] font-neodunggeunmo">
                다마고치의 이름을 정해보자~
              </div>
              <div className="absolute z-[131] top-[41%] left-[11%]  w-[280px] h-[35px]">
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-[280px] h-[35px] pl-[50px] py-[10px] rounded-lg text-[12px] border-[#CCCCCC] border border-solid"
                  placeholder="참고로 나는 강아지야. 토끼 아니다!"
                />
              </div>
              <div
                onClick={() => makeGochi()}
                className="cursor-pointer absolute z-[131] top-[56%] left-[11%] bg-[#3F3F3F] text-[#FAFAFA] w-[280px] h-[35px] rounded-lg flex justify-center items-center"
              >
                완료
              </div>
            </div>
          )}
          <img src="/room.png" className="absolute z-1" alt="room" />
          <div
            className={`inset-0 flex items-start justify-center absolute ${
              currentStep === 6 ? "z-[130]" : "z-[101]"
            } top-[10px] ${currentStep === 7 ? "z-[130]" : ""} ${
              currentStep === 8 || currentStep === 9 ? "z-[130]" : ""
            }`}
          >
            <div
              className={`relative  flex flex-col justify-center items-center ${
                currentStep === 6 ? "z-[130] bg-white px-[5px]" : ""
              } ${currentStep === 7 ? "z-[130]" : ""} `}
            >
              {currentStep === 6 ||
              currentStep === 7 ||
              currentStep === 8 ||
              currentStep === 9 ? (
                <div
                  className="w-[390px] cursor-pointer h-[50px] absolute z-[131]  top-[40px]"
                  onClick={goToNextStep}
                ></div>
              ) : (
                <></>
              )}

              <div
                className={`relative flex items-center ${
                  currentStep === 7 ? "" : ""
                }`}
              >
                <div
                  className={`flex mr-[13px]  ${
                    currentStep === 7 ? " text-white" : ""
                  } `}
                >
                  <img
                    src="/coin.svg"
                    alt="coin"
                    className={`${currentStep === 7 ? "z-[132] " : ""} `}
                  />
                  <span className="font-neodunggeunmo ml-[3px]">10</span>
                </div>

                <span
                  className={`${
                    currentStep === 8 ? "z-[135] text-white p-1" : ""
                  } font-neodunggeunmo mr-[8px]`}
                >
                  Day 2
                </span>

                <img
                  src="/energy.svg"
                  alt="energy"
                  className={`mr-[8px] ${
                    currentStep === 7 || currentStep === 8
                      ? "relative z-[1] opacity-40"
                      : ""
                  }`}
                />

                <div className={` flex ${currentStep === 9 ? "z-[135]" : ""}`}>
                  <img src="/heart.png" alt="heart" />
                  <img src="/heart.png" alt="heart" />
                  <img src="/heart.png" alt="heart" />
                  <img src="/heartHalf.png" alt="heart" />
                  <img src="/emptyHeart.png" alt="heart" />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`absolute flex justify-center items-center left-[7px] bottom-[10px] ${
              currentStep >= 10 && currentStep <= 13 ? "z-[132]" : "z-[102]"
            }`}
          >
            <div className="flex space-x-[8px]">
              <div
                className={`relative cursor-pointer ${
                  currentStep === 13 ? "opacity-40" : ""
                }`}
              >
                <img src="/button.png" alt="button" />
                <img
                  className="absolute z-[2] top-[2px] left-[21px]"
                  src="/food.png"
                  alt="button"
                />
              </div>
              <div
                className={`relative cursor-pointer ${
                  currentStep === 13 ? "opacity-40" : ""
                }`}
              >
                <img src="/button.png" alt="button" />
                <img
                  className="absolute z-[2] top-[2px] left-[21px]"
                  src="/cute.png"
                  alt="button"
                />
              </div>
              <div
                className={`relative cursor-pointer ${
                  currentStep === 13 ? "opacity-40" : ""
                }`}
              >
                <img src="/button.png" alt="button" />
                <img
                  className="absolute z-[2] top-[2px] left-[21px]"
                  src="/go.png"
                  alt="button"
                />
              </div>
              <div
                className={`relative cursor-pointer ${
                  currentStep === 13 ? "z-[135] " : ""
                }`}
              >
                <img src="/disableButton.png" alt="button" />
                <img
                  className="absolute z-[2] top-[2px] left-[21px]"
                  src="/fix.png"
                  alt="button"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`w-[390px]  ${
            sized
              ? "min-h-[749px] absolute top-[50%] translate-y-[-40%]  overflow-auto"
              : "min-h-[369px]"
          } relative   rounded-tl-[30px] rounded-tr-[30px] flex flex-col justify-start items-center pt-[10px] mt-[20px] bg-[#f4f4f4] z-[131] `}
        >
          <div
            className={`flex flex-col absolute ${
              currentStep >= 15 ? "bg-[#00000080]/50 z-[180]" : ""
            } w-[390px]  
            
            ${
              currentStep === 17 || currentStep === 18
                ? "h-[595px]"
                : "h-[422px]"
            } bottom-[0px] rounded-tl-[30px] rounded-tr-[30px]   ${
              currentStep === 16 ? "h-[428px]" : ""
            } ${currentStep === 19 || currentStep === 20 ? "h-[423px] " : ""}`}
          ></div>
          <img className="cursor-pointer" src="/union.png" alt="union" />

          {!month && <WeekCalendar month={month} setMonth={setMonth} />}
          {month && <MonthCalendar month={month} setMonth={setMonth} />}
          <div className="w-full px-[30px] flex justify-between font-neodunggeunmo items-center mb-[15px] mt-[30px]">
            <div
              className={`flex text-[12px] items-center ${
                currentStep === 19 || currentStep === 20
                  ? "relative z-[180] bg-white p-[1px]"
                  : ""
              }`}
            >
              <img src="/coin.svg" alt="coin" />
              <span className="ml-[5px]">Today Coin</span>
              <span className="ml-[5px]">2</span>
            </div>
            <div className="flex items-center">
              <img src="list.svg" alt="sort" />
              <span className="ml-[5px] text-[12px]">컬러태그 순</span>
            </div>
          </div>
          <TutorialTask currentStep={currentStep} />
        </div>
        <div className={`${sized ? "w-full h-[369px]" : ""}`}></div>
      </div>
    </div>
  );
}
