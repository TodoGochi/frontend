/* eslint-disable @next/next/no-img-element */
"use client";

import MonthCalendar from "@/app/components/MonthCalendar";
import SwipeActionList from "@/app/components/Task";
import WeekCalendar from "@/app/components/WeekCalendar";
import { instance } from "@/app/utils/axios";
import { useEffect, useState } from "react";

interface Experience {
  user_id: number;
  feed: number;
  play: number;
  pet: number;
}

interface Monster {
  user_id: number;
  level: string;
  health_status: string;
  nickname: string;
  happiness: number;
  created_at: string;
  sick_at: string | null;
  hunger: number;
  experience: Experience;
}

export default function Page() {
  const [month, setMonth] = useState(false);
  const [sized, setSized] = useState(false);
  const [day, setDay] = useState(0);
  const [walking, setWalking] = useState(false);
  const [timeLeft, setTimeLeft] = useState<any>({});

  const [status, setStatus] = useState<Monster>({
    user_id: 0,
    level: "",
    health_status: "",
    nickname: "",
    happiness: 0,
    created_at: "",
    sick_at: "",
    hunger: 0,
    experience: { user_id: 0, feed: 0, play: 0, pet: 0 },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime: any) => {
        if (prevTime.hour === 0 && prevTime.min === 0) {
          clearInterval(timer);
          return prevTime;
        }

        let newHour = prevTime.hour;
        let newMin = prevTime.min;

        if (newMin > 0) {
          newMin--;
        } else if (newHour > 0) {
          newHour--;
          newMin = 59;
        }

        return { hour: newHour, min: newMin };
      });
    }, 60000); // 1분(60000ms)마다 업데이트

    return () => clearInterval(timer);
  }, []);

  function calculateDaysSinceCreation(userData: Monster): number {
    const createdAt = new Date(userData.created_at);
    const today = new Date();

    // 시간대 차이로 인한 오차를 방지하기 위해 날짜만 비교
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
    const daysDifference = Math.floor(
      (todayUTC - createdAtUTC) / millisecondsPerDay
    );

    return daysDifference;
  }

  const getStatus = async () => {
    const res = await instance.get("/user");
    const resGotchi = await instance.get(
      `/tamagotchi/${res.data.userId}/status`
    );
    const resTime = await instance.get(
      `/tamagotchi/${res.data.userId}/level-progress`
    );
    setStatus(resGotchi.data);
    setDay(calculateDaysSinceCreation(resGotchi.data));
    setTimeLeft({ hour: res.data.hour, min: res.data.min });
  };

  const feed = async () => {
    const res = await instance.get("/user");
    try {
      const resGotchi = await instance.post(`tamagotchi/feed`, {
        userId: res.data.userId,
      });
    } catch (e: any) {
      if (e.status === 403) {
        alert("아픈 친구에게는 먹이를 줄 수 없어요");
      }
      console.log(e);
    }
    getStatus();
  };

  const pet = async () => {
    const res = await instance.get("/user");
    try {
      const resGotchi = await instance.post(`tamagotchi/pet`, {
        userId: res.data.userId,
      });
    } catch (e: any) {
      if (e.status === 403) {
        alert("아픈 친구를 쓰다듬을 수 없어요");
      }
      console.log(e);
    }
    getStatus();
  };

  const walk = async () => {
    const res = await instance.get("/user");
    try {
      const resGotchi = await instance.post(`tamagotchi/play`, {
        userId: res.data.userId,
      });
      setWalking(true);
    } catch (e: any) {
      if (e.status === 403) {
        alert("아픈 친구를 쓰다듬을 수 없어요");
      }
      setWalking(false);
      console.log(e);
    }
    getStatus();
  };

  const cure = async () => {
    const res = await instance.get("/user");
    try {
      const resGotchi = await instance.post(`tamagotchi/cure`, {
        userId: res.data.userId,
      });
    } catch (e: any) {
      console.log(e);
    }
    getStatus();
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div className="bg-neutral-700 flex items-center justify-center min-h-screen h-full w-screen max-xs:w-full max-xs:h-full relative flex-col">
      <div
        className={`relative w-[360px] mt-[30px] h-[300px] ${
          sized ? "z-[129]" : ""
        }`}
      >
        {walking ? (
          <img src="/back.gif" className="absolute z-1" alt="room" />
        ) : (
          <img src="/room.png" className="absolute z-1" alt="room" />
        )}

        <div className=" inset-0 flex items-start justify-center absolute z-[101] top-[10px] ">
          <div className="relative  flex flex-col justify-center items-center">
            <div className="flex items-center">
              <img src="/coin.svg" alt="coin" />
              <span className="font-neodunggeunmo mr-[13px] ml-[3px]">10</span>
              <span className="font-neodunggeunmo mr-[8px]">Day {day}</span>
              <img src="/energy.svg" alt="energy" className="mr-[8px]" />

              {Array.from({ length: status.happiness / 2 }, (_, index) => (
                <img
                  key={index}
                  src="/heart.png"
                  alt={`Repeated image ${index + 1}`}
                />
              ))}
              {Array.from({ length: status.happiness % 2 }, (_, index) => (
                <img
                  key={index}
                  src="/heartHalf.png"
                  alt={`Repeated image ${index + 1}`}
                />
              ))}
              {Array.from(
                { length: 5 - (status.happiness / 2 + (status.happiness % 2)) },
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
        {status.level === "egg" && (
          <div>
            <div className="absolute z-[101] top-[90px] left-[130px]">
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
              <div className="font-neodunggeunmo absolute z-[130] top-[12px] left-[0px] flex justify-center items-center">
                {String(timeLeft.hour).padStart(2, "0")}:
                {String(timeLeft.min).padStart(2, "0")}
              </div>
            </div>
            <img
              className="absolute z-[103] bottom-[70px] left-[120px]"
              src="/egg_default.gif"
              alt="egg"
            />
          </div>
        )}
        {status.level === "baby" && (
          <img src="/step2_default.gif" alt="adult" />
        )}
        {status.level === "adult" && (
          <img src="/step1_default.gif" alt="baby" />
        )}

        <div className="absolute flex justify-center items-center left-[7px] bottom-[10px] z-[102]">
          <div className="flex space-x-[8px]">
            <div className="relative cursor-pointer" onClick={feed}>
              <img src="/button.png" alt="button" />
              <img
                className="absolute z-[2] top-[2px] left-[21px]"
                src="/food.png"
                alt="button"
              />
            </div>
            <div className="relative cursor-pointer" onClick={pet}>
              <img src="/button.png" alt="button" />
              <img
                className="absolute z-[2] top-[2px] left-[21px]"
                src="/cute.png"
                alt="button"
              />
            </div>
            <div className="relative cursor-pointer" onClick={walk}>
              <img src="/button.png" alt="button" />
              <img
                className="absolute z-[2] top-[2px] left-[21px]"
                src="/go.png"
                alt="button"
              />
            </div>
            <div
              className={`relative ${
                status.health_status === "sick" ? "cursor-pointer" : ""
              } `}
              onClick={cure}
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
      </div>

      <div
        className={`w-[390px]  ${
          sized
            ? "min-h-[749px] absolute top-[50%] translate-y-[-40%] z-[130] overflow-auto"
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
            <span className="ml-[5px]">2</span>
          </div>
          <div className="flex items-center">
            <img src="list.svg" alt="sort" />
            <span className="ml-[5px] text-[12px]">컬러태그 순</span>
          </div>
        </div>
        <SwipeActionList />
      </div>
      <div className={`${sized ? "w-full h-[369px]" : ""}`}></div>
    </div>
  );
}
