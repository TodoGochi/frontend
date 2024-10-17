"use client";

import { useState, useEffect } from "react";
import { instance } from "@/app/utils/axios";

export function useCharacter() {
  const [status, setStatus] = useState({
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

  const [message, setMessage] = useState("");
  const [character, setCharacter] = useState("");
  const [walking, setWalking] = useState(false);
  const [day, setDay] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hour: 48, min: 0, sec: 0 });
  const [totalCoin, setTotalCoin] = useState(0);
  const [todayCoin, setTodayCoin] = useState(0);

  const [modal, setModal] = useState(false);
  const [button, setButton] = useState(2);
  const [modalCoin, setModalCoin] = useState(0);
  const [buttonText, setButtonText] = useState("REVIVE");
  const [modalText, setModalText] = useState("");
  const [which, setWhich] = useState("");
  const [characterModal, setCharacterModal] = useState(false);

  const getStatus = async () => {
    try {
      const res = await instance.get("/user");
      const resGotchi = await instance.get(
        `/tamagotchi/${res.data.userId}/status`
      );
      const resTime = await instance.get(
        `/tamagotchi/${resGotchi.data.id}/level-progress`
      );
      const resTransaction = await instance.get(
        `/user/${res.data.userId}/coin-transactions`
      );

      setStatus(resGotchi.data);
      setTotalCoin(res.data.coin);

      if (resGotchi.data.happiness <= 4 || resGotchi.data.hunger <= 4) {
        setCharacter(
          resGotchi.data.level === "baby" ? "/step1_sad.gif" : "/step2_sad.gif"
        );
        if (resGotchi.data.hunger <= 4) {
          hungerSay();
        }
      }

      setDay(calculateDaysSinceCreation(resGotchi.data));
      setTimeLeft({ hour: resTime.data.hour, min: resTime.data.min, sec: 0 });

      processMultipleDates(
        resTransaction.data.map((el: any) => ({
          createdAt: el.createdAt,
          changeAmount: el.changeAmount,
        }))
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
    } catch (error) {
      console.error("Error fetching status:", error);
    }
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

      await instance.post(`tamagotchi/${resGotchi.data.id}/feed`, {
        userId: res.data.userId,
      });

      setCharacter(
        resGotchi.data.level === "baby"
          ? "/step1_happy.gif"
          : "/step2_happy.gif"
      );

      getStatus();
    } catch (e) {
      console.log(e);
    }
  };

  const pet = async () => {
    try {
      const res = await instance.get("/user");
      const resGotchi = await instance.get(
        `/tamagotchi/${res.data.userId}/status`
      );

      if (resGotchi.data.happiness === 10) {
        setMessage("너의 사랑은 충분해!");
        return;
      }

      heartSay();

      await instance.post(`tamagotchi/${resGotchi.data.id}/pet`, {
        userId: res.data.userId,
      });

      setCharacter(
        resGotchi.data.level === "baby"
          ? "/step1_happy.gif"
          : "/step2_happy.gif"
      );

      getStatus();
    } catch (e) {
      console.log(e);
    }
  };

  const walk = async () => {
    try {
      const res = await instance.get("/user");
      const initialCoin = res.data.coin;
      const resGotchi = await instance.get(
        `/tamagotchi/${res.data.userId}/status`
      );

      setWalking(true);

      // 캐릭터 걷는 애니메이션 함수
      const walkAnimation = async () => {
        setCharacter(
          resGotchi.data.level === "baby" ? "/babyWalk.gif" : "/adultWalk2.gif"
        );
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setCharacter(
          resGotchi.data.level === "baby" ? "/babyWalk2.gif" : "/adultWalk.gif"
        );
        await new Promise((resolve) => setTimeout(resolve, 4000));
      };

      // 걷는 애니메이션 시작
      const walkAnimationPromise = walkAnimation();

      // 'play' API 호출
      const resGotchiWalk = await instance.post(
        `tamagotchi/${resGotchi.data.id}/play`,
        { userId: res.data.userId }
      );

      // 업데이트된 코인 잔액 가져오기
      const resAfterWalk = await instance.get("/user");
      const updatedCoin = resAfterWalk.data.coin;
      const coinGained = updatedCoin - initialCoin;

      // 코인 상태 업데이트
      setTotalCoin(updatedCoin);

      // 걷는 애니메이션이 끝날 때까지 기다림
      await walkAnimationPromise;

      setWalking(false);

      // 결과에 따른 캐릭터 상태 설정
      if (coinGained > 0) {
        setCharacter(
          resGotchi.data.level === "baby" ? "/babyCoin.gif" : "/adultCoin.gif"
        );
        setModalText(`${resGotchi.data.nickname}(이)가 코인을 찾았어요!`);
        setModalCoin(coinGained);
      } else {
        setCharacter(
          resGotchi.data.level === "baby" ? "/step1_sad.gif" : "/step2_sad.gif"
        );
        setModalText(`${resGotchi.data.nickname}(이)가 아무것도 찾지 못했어요`);
        setModalCoin(0);
      }

      setCharacterModal(true);
      setButton(1);
      setWhich("coin");

      // 3초 대기
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setCharacter("");
      getStatus(); // 상태 업데이트
    } catch (e) {
      console.error("Error in walk function:", e);
      setWalking(false);
      setCharacter("");
    }
  };

  const cure = async () => {
    try {
      const res = await instance.get("/user");
      const resGotchi = await instance.get(
        `/tamagotchi/${res.data.userId}/status`
      );

      await instance.post(`/tamagotchi/${resGotchi.data.id}/cure`, {
        userId: res.data.userId,
      });

      setCharacter(
        resGotchi.data.level === "baby"
          ? "/step1_happy.gif"
          : "/step2_happy.gif"
      );

      getStatus();
    } catch (e) {
      console.log(e);
    }
  };

  const restart = async () => {
    try {
      const res = await instance.get("/user");
      const resGotchi = await instance.get(
        `/tamagotchi/${res.data.userId}/status`
      );

      await instance.post(`/tamagotchi/${resGotchi.data.id}/restart`);

      getStatus();
    } catch (e) {
      console.log(e);
    }
  };

  // 캐릭터의 대사 함수들
  const eggSay = () => {
    const messages = [
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
    const messages = [
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
    const messages = [
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
    const messages = [
      "너무 포근해, 사랑해!",
      "이 느낌, 정말 최고야!",
      "너무 포근해, 사랑해!",
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  };

  const feedSay = () => {
    const messages = [
      "냠냠, 고마워!",
      "더 먹고 싶어, 멍멍!",
      "이거 먹고 뛰어놀 거야!!",
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  };

  const hungerSay = () => {
    const messages = [
      "힘이 없어, 배고파",
      "배가 꼬르륵-!",
      "밥 먹고 싶어, 멍!",
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  };

  // 날짜 계산 함수
  function calculateDaysSinceCreation(userData: any) {
    const createdAt = new Date(userData.created_at);
    const today = new Date();

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

  // 코인 추적 함수
  function trackCoins(createdAtStr: any, changeAmount: any) {
    const createdAt = new Date(createdAtStr);
    const today = new Date();

    const createdAtKST = new Date(createdAt.getTime() + 9 * 60 * 60 * 1000);
    const todayKST = new Date(today.getTime() + 9 * 60 * 60 * 1000);

    createdAtKST.setUTCHours(0, 0, 0, 0);
    todayKST.setUTCHours(0, 0, 0, 0);

    const daysDiff = Math.floor(
      (todayKST.getTime() - createdAtKST.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === 0 && changeAmount > 0) {
      setTodayCoin((prev) => prev + changeAmount);
    }
  }

  function processMultipleDates(data: any) {
    setTodayCoin(0); // 오늘의 코인을 초기화
    data.forEach((info: any) => trackCoins(info.createdAt, info.changeAmount));
  }

  useEffect(() => {
    getStatus();
  }, []);

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    // 초기 메시지 설정
    if (status.level === "egg") {
      eggSay();
    } else if (status.level === "baby") {
      babySay();
    } else if (status.level === "adult") {
      adultSay();
    }

    // 메시지 타이머 설정
    if (message !== "") {
      const messageTimer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(messageTimer);
    }
  }, [status.level]);

  // 레벨 진행 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.hour === 0 && prevTime.min === 0 && prevTime.sec === 0) {
          clearInterval(timer);
          return prevTime;
        }

        let { hour, min, sec } = prevTime;

        if (sec > 0) {
          sec--;
        } else if (min > 0) {
          min--;
          sec = 59;
        } else if (hour > 0) {
          hour--;
          min = 59;
          sec = 59;
        }

        return { hour, min, sec };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 메시지 상태 초기화
  useEffect(() => {
    if (message !== "") {
      const msgTimer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(msgTimer);
    }
  }, [message]);

  return {
    status,
    message,
    character,
    walking,
    day,
    timeLeft,
    totalCoin,
    todayCoin,
    modal,
    setModal,
    button,
    setButton,
    modalCoin,
    setModalCoin,
    buttonText,
    setButtonText,
    modalText,
    setModalText,
    which,
    setWhich,
    characterModal,
    setCharacterModal,
    feed,
    pet,
    walk,
    cure,
    restart,
    getStatus,
  };
}
