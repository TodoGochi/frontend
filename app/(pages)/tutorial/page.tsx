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
    content: `안녕, 나는 너와 함께할 투두고치야
지금부터 투두고치를 설명해 줄게`,
  },
  {
    title: "Step 2",
    content: `우리는 총 3단계로 성장해
점점 더 귀여워질 거야, 기대해!`,
  },
  {
    title: "Step3",
    content: `알은 쓰다듬기만 할 수 있어
어느 순간, 뚜둥! 알에서 깨어나지.`,
  },
  {
    title: "Step 4",
    content: `알에서 깨어나면 아기 강아지,
열심히 밥 주고 쓰다듬고 산책시켜주면...`,
  },
  {
    title: "Step 4",
    content: "짜잔-! 내가 되지롱.",
  },
  {
    title: "Step 4",
    content: `나머지 투두고치 기능들을 설명해 줄게`,
  },
  {
    title: "Step 4",
    content: `왼쪽부터 코인, 함께한 날짜,
배고픔 게이지, 행복도 게이지야`,
  },
  {
    title: "Step 4",
    content: `코인은 투두를 완료하면 얻을 수 있어
산책에서도 가끔 발견할 수 있지, 럭키!`,
  },
  {
    title: "Step 4",
    content: `함께한 날짜는 투두고치가 태어난 날부터 \n시작이야. 잘 키워 보라고-`,
  },
  {
    title: "Step 4",
    content: `배고픔 게이지는 먹이주기,
행복도 게이지는 쓰다듬기랑 산책으로!`,
  },
  {
    title: "Step 4",
    content: `이제 하단 버튼을 설명해 줄게.`,
  },
  {
    title: "Step 4",
    content: "왼쪽부터 먹이주기, 쓰다듬기, 산책하기, \n 치료하기야.",
  },
  {
    title: "Step 4",
    content: `먹이주기와 산책하기는 1코인,
쓰다듬기는 꽁짜야!  많이많이 해줘!`,
  },
  {
    title: "Step 4",
    content: `치료하기는 투두고치가 아플 때만 가능해.
밥을 안 주면 많이 아파...`,
  },
  {
    title: "Step 4",
    content: `투두리스트도 간단히 설명해 줄게`,
  },
  {
    title: "Step 4",
    content: ` '할 일 추가'를 누르면 작성할 수 있어
오른쪽'+'버튼을 누르면 상세 설정이 가능해`,
  },
  {
    title: "Step 4",
    content: ` '할 일 추가'를 누르면 작성할 수 있어
오른쪽'+'버튼을 누르면 상세 설정이 가능해`,
  },
  {
    title: "Step 4",
    content: `컬러 태그, 요일 별 반복도 설정할 수 있어.
컬러로 카테고리를 나눠봐!`,
  },

  {
    title: "Step 4",
    content:
      "작성한 후에 화면 아무 곳이나 터치하면 작성 \n이 완료되니까 이 점 알아둬.",
  },

  {
    title: "Step 4",
    content: `작성한 투두는 스와이프 하면 수정, 미루기,  \n 삭제 가능해`,
  },

  {
    title: "Step 4",
    content: `각 컬러 태그의 할 일을 모두 완료하면 1코인,`,
  },
  {
    title: "Step 4",
    content: `모든 컬러 태그 완료 시에는 보너스 코인을
지급하니까 꼭 받도록!`,
  },
  {
    title: "Step 4",
    content: `나머지는 눌러 봐... 말을 너무 많이 했더니
배고파. 이제 새 친구를 줄 테니 이름 지어줘.`,
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
    } catch (e) {
      console.log(e);
    }
    setCurrentStep(currentStep + 1);
  };

  const getWhoAreYou = async () => {
    const res = await instance.get("/user");
    const gotchiRes = await instance(`/tamagotchi/${res.data.userId}/status`);
    if (gotchiRes.data.id) router.push("/main");
  };

  useEffect(() => {
    getWhoAreYou();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center py-auto">
      <div className="bg-black flex items-center justify-center min-h-screen h-full w-screen max-xs:w-full max-xs:h-full relative flex-col">
        <div
          className={`relative w-[360px] max-xs:w-full mt-[30px] h-[300px] ${
            sized ? "z-[129]" : ""
          }`}
        >
          {isClient && currentStep <= 22 && (
            <div
              className={`absolute  ${
                currentStep === 6 ? "z-[129]" : "z-[130]"
              } min-w-[360px] max-xs:w-full h-[300px] ${
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
                <div className="flex mt-[54px]">
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

          {isClient && currentStep === 21 && modal && (
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
                투두고치의 이름을 정해보자~
              </div>
              <div className="absolute z-[131] top-[41%] left-[11%]  w-[280px] h-[35px] flex justify-center items-center">
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-[280px] h-[35px]  text-center font-neodunggeunmo py-[10px] rounded-lg text-[12px] border-[#CCCCCC] border border-solid flex justify-center items-center"
                  placeholder="(참고로 나는 강아지야. 토끼 아니다!)"
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
          {isClient && currentStep === 23 && (
            <div className="absolute z-[130] w-[360px] h-full bg-[#00000080]/50 rounded-2xl left-0">
              <div className="absolute z-[131] w-[330px] h-[160px] left-[4%] top-[20%]">
                <img
                  className="z-[131] w-[330px] h-[160px]"
                  src="/popup.png"
                  alt="popup"
                />
              </div>
              <div className="absolute z-[131] top-[28%] left-[40%] font-neodunggeunmo">
                반가워요!
              </div>
              <div className="absolute z-[131] top-[35%] left-[30%] font-neodunggeunmo">
                웰컴 리워드를 드릴게요.
              </div>
              <div className="absolute z-[131] top-[41%] left-[11%]  w-[280px] h-[35px] flex justify-center items-center gap-[4px]">
                <div className="font-neodunggeunmo text-[12px] text-[#737373]">
                  웰컴 리워드
                </div>
                <img src="/coin.svg" alt="coin" />
                <div className="font-neodunggeunmo text-[#737373]">10</div>
              </div>
              <div
                onClick={() => router.push("/main")}
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
                  className="w-[390px] max-xs:w-full cursor-pointer h-[50px] absolute z-[131]  top-[40px]"
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
                    currentStep === 8 ? "z-[135] text-white " : ""
                  } font-neodunggeunmo p-1`}
                >
                  Day 2
                </span>

                <img
                  src="/energy.svg"
                  alt="energy"
                  className={` ${
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
          className={`w-[390px] max-xs:w-full ${
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
                ? "h-[568px]"
                : "h-[416px]"
            } bottom-[0px] rounded-tl-[30px] rounded-tr-[30px]   ${
              currentStep === 16 ? "h-[428px]" : ""
            } ${currentStep === 19 || currentStep === 20 ? "h-[27rem] " : ""}`}
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
