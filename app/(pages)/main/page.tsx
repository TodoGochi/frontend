/* eslint-disable @next/next/no-img-element */
"use client";

import HungerMeter from "@/app/components/EnergyBar";
import GochiModal from "@/app/components/GotchiModal";
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

interface TimeLeft {
  hour: number;
  min: number;
  sec: number;
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
  const [character, setCharacter] = useState("");
  const [modal, setModal] = useState(false);
  const [button, setButton] = useState(2);
  const [totalCoin, setTotalCoin] = useState(0);
  const [sized, setSized] = useState(false);
  const [modalCoin, setModalCoin] = useState(0);
  const [buttonText, setButtonText] = useState("REVIVE");
  const [day, setDay] = useState(0);
  const [walking, setWalking] = useState(false);
  const [modalText, setModalText] = useState("");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState<any>({ hour: 48, min: 0, sec: 0 });
  const [todayCoin, setTodayCoin] = useState(0);
  const [which, setWhich] = useState("");
  const [characterModal, setCharacterModal] = useState(false);

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
      setTimeLeft((prevTime: TimeLeft) => {
        if (prevTime.hour === 0 && prevTime.min === 0 && prevTime.sec === 0) {
          clearInterval(timer);
          return prevTime;
        }

        let newHour = prevTime.hour;
        let newMin = prevTime.min;
        let newSec = prevTime.sec;

        if (newSec > 0) {
          newSec--;
        } else if (newMin > 0) {
          newMin--;
          newSec = 59;
        } else if (newHour > 0) {
          newHour--;
          newMin = 59;
          newSec = 59;
        }

        return { hour: newHour, min: newMin, sec: newSec };
      });
      getStatus();
      getTodayCoin();
    }, 1000); // 1초(1000ms)마다 업데이트

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
    const resTransaction = await instance.get(
      `/user/${res.data.userId}/coin-transactions`
    );

    setTotalCoin(res.data.coin);

    const resTime = await instance.get(
      `/tamagotchi/${resGotchi.data.id}/level-progress`
    );

    setStatus(resGotchi.data);

    if (resGotchi.data.happiness <= 4) {
      setCharacter(
        resGotchi.data.level === "baby" ? "/step1_sad.gif" : "/step2_sad.gif"
      );
    }

    if (resGotchi.data.hunger <= 4) {
      setCharacter(
        resGotchi.data.level === "baby" ? "/step1_sad.gif" : "/step2_sad.gif"
      );
      hungerSay();
    }

    setDay(calculateDaysSinceCreation(resGotchi.data));
    setTimeLeft({ hour: resTime.data.hour, min: resTime.data.min, sec: 0 });
  };

  const feed = async () => {
    try {
      const res = await instance.get("/user");
      const resGotchi = await instance.get(
        `/tamagotchi/${res.data.userId}/status`
      );

      if (resGotchi.data.hunger === 10) {
        setMessage("더는 못 먹겠어! 배가 이미 빵빵해.");

        return;
      }

      feedSay();

      const resGotchiFeed = await instance.post(
        `tamagotchi/${resGotchi.data.id}/feed`,
        {
          userId: res.data.userId,
        }
      );

      setCharacter(
        status.level === "baby" ? "/step1_happy.gif" : "/step2_happy.gif"
      );
    } catch (e: any) {
      console.log(e);
    }
    getStatus();
  };

  const pet = async () => {
    const res = await instance.get("/user");
    const resGotchi = await instance.get(
      `/tamagotchi/${res.data.userId}/status`
    );

    if (resGotchi.data.happiness === 10) {
      setMessage("너의 사랑은 충분해!");
      setTimeout(() => {}, 2000);
      return;
    }
    heartSay();

    try {
      const resGotchiPet = await instance.post(
        `tamagotchi/${resGotchi.data.id}/pet`,
        {
          userId: res.data.userId,
        }
      );
      setCharacter(
        status.level === "baby" ? "/step1_happy.gif" : "/step2_happy.gif"
      );
    } catch (e: any) {
      console.log(e);
    }
    getStatus();
  };

  const walk = async () => {
    const res = await instance.get("/user");
    const resGotchi = await instance.get(
      `/tamagotchi/${res.data.userId}/status`
    );

    try {
      const resGotchiWalk: any = await instance.post(
        `tamagotchi/${resGotchi.data.id}/play`,
        {
          userId: res.data.userId,
        }
      );

      const coin = resGotchiWalk.data.coin;

      if (coin - res.data.coin !== 0) {
        setTimeout(() => {
          if (status.level === "baby") setCharacter("/babyCoin.gif");
          else setCharacter("/adultCoin.gif");
          setCharacterModal(true);
          setButton(1);
          setWhich("coin");
          setModalText(`${resGotchi.data.nickname}(이)가 코인을 찾았어요!`);
          getStatus();
          setModalCoin(coin - res.data.coin);
        }, 6100);
      } else {
        setTimeout(() => {
          setCharacterModal(true);
          setButton(1);
          setModalText(
            `${resGotchi.data.nickname}(이)가 아무것도 찾지 못했어요`
          );
          setCharacter(
            resGotchi.data.level === "baby"
              ? "/step1_sad.gif"
              : "/step2_sad.gif"
          );
          getStatus();
        }, 6100);
      }
      setWalking(true);
    } catch (e: any) {
      setWalking(false);
      console.log(e);
    }
  };

  const cure = async () => {
    const res = await instance.get("/user");
    const resGotchi = await instance.get(
      `/tamagotchi/${res.data.userId}/status`
    );

    try {
      const resGotchiCure = await instance.post(
        `/tamagotchi/${resGotchi.data.id}/cure`,
        {
          userId: res.data.userId,
        }
      );
      setCharacter(
        status.level === "baby" ? "/step1_happy.gif" : "/step2_happy.gif"
      );
    } catch (e: any) {
      console.log(e);
    }
    getStatus();
  };

  const cureModal = async () => {
    const res = await instance.get("/user");
    const resGotchi = await instance.get(
      `/tamagotchi/${res.data.userId}/status`
    );

    setCharacterModal(true);
    setModalText(
      `${resGotchi.data.nickname}(이)가 아파요. \n 치료 하시겠어요?`
    );
    setModalCoin(-3);
    setButton(1);
    setWhich("cure");
  };

  const walkModal = async () => {
    const res = await instance.get("/user");
    const resGotchi = await instance.get(
      `/tamagotchi/${res.data.userId}/status`
    );
    setCharacterModal(true);
    setButton(1);
    setModalCoin(0);
    setWhich("cured");
    setModalText(`${resGotchi.data.nickname}(이)가 산책을 떠나요`);
    walk();
  };

  const restart = async () => {
    try {
      const res = await instance.get("/user");
      const resGotchi = await instance.get(
        `/tamagotchi/${res.data.userId}/status`
      );

      instance.post(`/tamagotchi/${resGotchi.data.id}/restart`);
    } catch (e) {
      console.log(e);
    }
  };

  const eggSay = () => {
    const messages: string[] = [
      "이 순간을 만끽하고 있어!",
      "너를 위해 내가 더 귀여워질게, 기대해!",
      "너는 나의 소중한 친구야.",
      "몸이 막 근질근질해!",
      "너와 함께 할 수 있어 정말 행복해!",
      "내 목소리 들리니?",
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  };

  const babySay = () => {
    const messages: string[] = [
      "너의 사랑이 필요해!",
      "내가 이렇게 귀여운 건 네 덕분이야!",
      "너를 생각하면서 놀고 있었어.",
      "내가 최고의 강아지라는 건 모두가 알아!",
      "너와 함께하는 매일이 소중해.",
      "산책 가는 건 나의 특권이야!",
      "내가 귀여운 건 대체로 사실이야.",
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  };

  const adultSay = () => {
    const messages: string[] = [
      "어른 강아지로서 품격을 지켜야 해.",
      "나의 성숙한 매력에 빠져봐!",
      "너는 나의 소중한 친구야.",
      "너와 함께하는 매일이 소중해.",
      "꾸준한 모습 진짜 멋져, 내 자랑이야!",
      "일 끝나면 나랑 산책하러 가자, 약속이야!",
      "일할 때 나도 옆에서 응원해 줄게!",
      "내 귀여움이 힘이 돼.",
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  };

  const heartSay = () => {
    const messages: string[] = [
      "너무 포근해, 사랑해!",
      "이 느낌, 정말 최고야!",
      "너무 포근해, 사랑해!",
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  };

  const feedSay = () => {
    const messages: string[] = [
      "냠냠, 고마워!",
      "더 먹고 싶어, 멍멍!",
      "이거 먹고 뛰어놀 거야!!",
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  };

  const hungerSay = () => {
    const messages: string[] = [
      "힘이 없어, 배고파",
      "배가 꼬르륵-!",
      "밥 먹고 싶어, 멍!",
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  };

  const getTodayCoin = async () => {
    const res = await instance.get("/user");
    const resTransaction = await instance.get(
      `/user/${res.data.userId}/coin-transactions`
    );
    processMultipleDates(
      resTransaction.data.map((el: any) => ({
        createdAt: el.createdAt,
        changeAmount: el.changeAmount,
      }))
    );
  };

  const getInfoFirst = async () => {
    const res = await instance.get("/user");
    const resGotchi = await instance.get(
      `/tamagotchi/${res.data.userId}/status`
    );

    if (resGotchi.data.happiness <= 5) {
      setCharacterModal(true);
      setModalText(`${resGotchi.data.nickname}(이)가 ${res.data.nickName}님의
손길을 기다려요.`);
      setButton(1);
    }

    if (resGotchi.data.level === "egg") {
      eggSay();
    } else if (resGotchi.data.level === "adult") {
      adultSay();
    } else {
      babySay();
    }

    if (
      resGotchi.data.health_status !== "sick" &&
      resGotchi.data.health_status !== "healthy"
    ) {
      setCharacterModal(true);
      setCharacter(
        status.level === "baby" ? "/step1_death.gif" : "/step2_death.gif"
      );
      setModalText(`${resGotchi.data.nickname}(이)가 투두고치별로 갔어요.
어떻게 하시겠어요?`);
      setButton(2);
      setModalCoin(-10);
    } else if (resGotchi.data.health_status === "sick") {
      setCharacterModal(true);
      setModalText(`${resGotchi.data.nickname}(이)가 아파요.
        치료 하시겠어요?`);
      setModalCoin(-3);
      setWhich("cure");
      setButton(1);
    }
  };

  useEffect(() => {
    getStatus();
    getInfoFirst();
    getTodayCoin();
  }, []);

  const walkingA = async () => {
    setTimeout(() => {
      setCharacter(
        status.level === "baby" ? "/babyWalk2.gif" : "/adultWalk.gif"
      );
    }, 2000);
  };

  const walkingB = async () => {
    setTimeout(() => {}, 500);
  };

  const walkingAB = async () => {
    await walkingA();
    await walkingB();
    setCharacter(status.level === "baby" ? "/babyWalk.gif" : "/adultWalk2.gif");
  };

  useEffect(() => {
    if (!walking) return;
    walkingAB();
    setTimeout(() => {
      setWalking(false);
      setCharacter("");
    }, 6000);
  }, [walking]);

  useEffect(() => {
    if (
      character !== "/babyCoin.gif" &&
      character !== "/adultCoin.gif" &&
      character !== "/step1_happy.gif" &&
      character !== "/step2_happy.gif" &&
      character !== "/step2_sad.gif" &&
      character !== "/step1_sad.gif"
    )
      return;
    setTimeout(() => {
      setCharacter("");
    }, 3500);
  }, [character]);

  function trackCoins(createdAtStr: string, changeAmount: number) {
    const createdAt = new Date(createdAtStr);
    const today = new Date();

    // 한국 시간대로 변환
    const createdAtKST = new Date(createdAt.getTime() + 9 * 60 * 60 * 1000);
    const todayKST = new Date(today.getTime() + 9 * 60 * 60 * 1000);

    // 날짜만 비교하기 위해 시간을 00:00:00으로 설정
    createdAtKST.setUTCHours(0, 0, 0, 0);
    todayKST.setUTCHours(0, 0, 0, 0);

    const daysDiff = Math.floor(
      (todayKST.getTime() - createdAtKST.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === 0) {
      if (changeAmount > 0) setTodayCoin((prev) => prev + changeAmount);
    }
  }

  function processMultipleDates(data: any) {
    data.map((info: any) => ({
      coins: trackCoins(info.createdAt, info.changeAmount),
    }));
  }

  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);

  return (
    <>
      <div className="bg-black flex items-center  min-h-screen h-full max-xs:w-full max-xs:h-full relative flex-col">
        <div className="bg-[#3f3f3f] flex justify-center flex-col items-center">
          <div
            className={`relative min-w-[360px] max-xs:w-full mt-[30px] h-[300px] ${
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
                  <span className="font-neodunggeunmo mr-[13px] ml-[3px]">
                    {totalCoin}
                  </span>
                  <span className="font-neodunggeunmo mr-[8px]">Day {day}</span>
                  <HungerMeter hunger={status.hunger} />

                  {Array.from(
                    { length: Math.floor(status.happiness / 2) },
                    (_, index) => (
                      <img
                        key={index}
                        src="/heart.png"
                        alt={`Repeated image ${index + 1}`}
                      />
                    )
                  )}
                  {Array.from({ length: status.happiness % 2 }, (_, index) => (
                    <img
                      key={index}
                      src="/heartHalf.png"
                      alt={`Repeated image ${index + 1}`}
                    />
                  ))}
                  {Array.from(
                    {
                      length:
                        5 -
                        (Math.floor(status.happiness / 2) +
                          (status.happiness % 2)),
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
                {message !== "" && (
                  <div className="absolute z-[135] top-1/2 -translate-y-[185%] w-[80%] max-w-[300px] translate-x-[11%]">
                    <div className="relative">
                      <img
                        src="speech.png"
                        className="w-full h-auto"
                        alt="speech"
                      />
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
              <div>
                {message !== "" && (
                  <div className=" absolute z-[135] top-1/2 -translate-y-[185%] w-[80%] max-w-[300px] translate-x-[11%]">
                    <div className="relative">
                      <img
                        src="speech.png"
                        className="w-full h-auto"
                        alt="speech"
                      />
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

                <img
                  src={character !== "" ? character : "/step1_default.gif"}
                  alt="baby"
                  className="absolute z-[103] bottom-[60px] left-[120px]"
                />
              </div>
            )}
            {status.level === "adult" && (
              <div>
                {message !== "" && (
                  <div className=" absolute z-[135] top-1/2 -translate-y-[185%] w-[80%] max-w-[300px] translate-x-[11%]">
                    <div className="relative">
                      <img
                        src="speech.png"
                        className="w-full h-auto"
                        alt="speech"
                      />
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
                <img
                  src={character !== "" ? character : "/step2_default.gif"}
                  alt="adult"
                  className="absolute z-[103] bottom-[60px] left-[120px]"
                />
              </div>
            )}

            <div className="absolute flex justify-center items-center left-[7px] bottom-[10px] z-[102]">
              <div className="flex space-x-[8px]">
                {status.level === "egg" || status.health_status == "dead" ? (
                  <div className="relative ">
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
                  onClick={
                    status.health_status !== "sick" ? () => {} : cureModal
                  }
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
            {characterModal && (
              <GochiModal
                text={modalText}
                setModal={setCharacterModal}
                coin={modalCoin}
                button={button}
                restart={restart}
                cure={cure}
                buttonText={buttonText}
                which={which}
                totalCoin={totalCoin}
              />
            )}
          </div>

          <div
            className={`w-[390px]  max-xs:w-full  ${
              sized
                ? "max-h-[749px] absolute top-[50px] t z-[130] overflow-auto"
                : "min-h-[369px]"
            } bg-[#f4f4f4] rounded-tl-[30px] rounded-tr-[30px] flex flex-col justify-start items-center pt-[10px] mt-[20px]`}
          >
            <img
              className="cursor-pointer "
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
              <div className="flex items-center">
                <img src="list.svg" alt="sort" />
                <span className="ml-[5px] text-[12px] font-suit">
                  컬러태그 순
                </span>
              </div>
            </div>
            <SwipeActionList sized={sized} />
          </div>
          <div className={`${sized ? "w-full h-[369px]" : ""}`}></div>
        </div>
        {modal && (
          <GochiModal
            text={modalText}
            setModal={setModal}
            coin={modalCoin}
            button={button}
            restart={restart}
            cure={cure}
            buttonText={buttonText}
            which={which}
          />
        )}
      </div>
    </>
  );
}
