// useCharacter.ts
import { useState, useEffect, useCallback } from "react";
import { instance } from "@/app/utils/axios";
import { CharacterStatus, TimeLeft, ModalState } from "../types/types";
import {
  calculateDaysSinceCreation,
  decrementTime,
  trackCoins,
} from "../utils/utils";
import { getCharacterImage, getRandomMessage } from "../utils/characterUtils";
import { API_ENDPOINTS } from "../utils/constants";

export function useCharacter() {
  const [status, setStatus] = useState<CharacterStatus>({
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
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hour: 48,
    min: 0,
    sec: 0,
  });
  const [totalCoin, setTotalCoin] = useState(0);
  const [todayCoin, setTodayCoin] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    button: 2,
    coin: 0,
    buttonText: "REVIVE",
    text: "",
    which: "",
    isCharacterModal: false,
  });

  const getStatus = useCallback(async (updateCharacter = true) => {
    try {
      const userRes = await instance.get(API_ENDPOINTS.USER);
      const tamagotchiRes = await instance.get(
        API_ENDPOINTS.TAMAGOTCHI_STATUS(userRes.data.userId)
      );
      const [levelProgressRes, transactionRes] = await Promise.all([
        instance.get(API_ENDPOINTS.LEVEL_PROGRESS(tamagotchiRes.data.id)),
        instance.get(API_ENDPOINTS.COIN_TRANSACTIONS(userRes.data.userId)),
      ]);

      setStatus(tamagotchiRes.data);
      setTotalCoin(userRes.data.coin);
      if (updateCharacter) {
        setCharacter(getCharacterImage(tamagotchiRes.data));
      }
      setDay(calculateDaysSinceCreation(tamagotchiRes.data));
      updateTimer(levelProgressRes.data);
      processTransactions(transactionRes.data);
      checkCharacterStatus(tamagotchiRes.data);
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  }, []);

  const updateTimer = (timeData: {
    hour: number;
    min: number;
    sec: number;
  }) => {
    if (timeData.hour !== 0 || timeData.min !== 0 || timeData.sec !== 0) {
      setTimeLeft({
        hour: timeData.hour,
        min: timeData.min,
        sec: timeData.sec,
      });
      setTimerOn(true);
    } else {
      setTimerOn(false);
    }
  };

  const processTransactions = (transactions: any[]) => {
    setTodayCoin(0);
    transactions.forEach((info: any) =>
      trackCoins(info.createdAt, info.changeAmount, setTodayCoin)
    );
  };

  const checkCharacterStatus = (characterData: CharacterStatus) => {
    if (
      characterData.health_status !== "sick" &&
      characterData.health_status !== "healthy"
    ) {
      setDeathModal(characterData);
    } else if (characterData.health_status === "sick") {
      setSickModal(characterData);
    }
  };

  const setDeathModal = (characterData: CharacterStatus) => {
    setModalState({
      isOpen: true,
      isCharacterModal: true,
      text: `${characterData.nickname}(이)가 투두고치별로 갔어요. 어떻게 하시겠어요?`,
      button: 2,
      coin: -10,
      which: "death",
    });
    setCharacter(getCharacterImage(characterData, "death"));
  };

  const setSickModal = (characterData: CharacterStatus) => {
    setModalState({
      isOpen: true,
      isCharacterModal: true,
      text: `${characterData.nickname}(이)가 아파요. 치료 하시겠어요?`,
      coin: -3,
      which: "cure",
      button: 1,
    });
  };

  const onlyFirstInfo = async () => {
    try {
      const userRes = await instance.get(API_ENDPOINTS.USER);
      const tamagotchiRes = await instance.get(
        API_ENDPOINTS.TAMAGOTCHI_STATUS(userRes.data.userId)
      );

      checkHappiness(tamagotchiRes.data, userRes.data.nickName);
      applyLevelEffect(tamagotchiRes.data);
    } catch (error) {
      console.error("Error in onlyFirstInfo:", error);
    }
  };

  const checkHappiness = (
    characterData: CharacterStatus,
    userNickName: string
  ) => {
    if (
      characterData.health_status === "dead" ||
      characterData.health_status === "sick"
    ) {
      return;
    }

    if (characterData.happiness <= 5) {
      setModalState({
        isOpen: true,
        isCharacterModal: true,
        text: `${characterData.nickname}(이)가 ${userNickName}님의 손길을 기다려요.`,
        button: 1,
        coin: 0,
        which: "",
      });
    }
  };

  const handleTimerEnd = useCallback(async () => {
    setCharacter("/egg_cracking.gif");
    await getStatus(false); // 캐릭터 이미지를 업데이트하지 않음
  }, [status]);

  useEffect(() => {
    if (timerOn) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime.hour === 0 && prevTime.min === 0 && prevTime.sec === 0) {
            clearInterval(timer);
            handleTimerEnd();
            return prevTime;
          }
          return decrementTime(prevTime);
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timerOn, handleTimerEnd]);

  const applyLevelEffect = async (characterData: CharacterStatus) => {
    console.log(characterData);

    const babyEffect = characterData?.levelEffects?.find(
      (effect) => effect?.level === 1 && effect.effectApplied === true
    );

    const adultEffect = characterData?.levelEffects?.find(
      (effect) => effect?.level === 2 && effect.effectApplied === true
    );

    if (characterData.level === "baby" && !babyEffect) {
      setCharacter("/egg_cracking.gif");
      await instance.post(
        API_ENDPOINTS.LEVEL_UP_EFFECT(characterData.id as number, 1),
        {}
      );
    } else if (characterData.level === "adult" && !adultEffect) {
      setCharacter("/step1_next.gif");
      await instance.post(
        API_ENDPOINTS.LEVEL_UP_EFFECT(characterData.id as number, 2),
        {}
      );
    }
  };

  const feed = async () => {
    try {
      const userRes = await instance.get(API_ENDPOINTS.USER);
      const [tamagotchiRes] = await Promise.all([
        instance.get(API_ENDPOINTS.TAMAGOTCHI_STATUS(userRes.data.userId)),
      ]);

      if (tamagotchiRes.data.hunger === 10) {
        setMessage("더는 못 먹겠어! 배가 이미 빵빵해.");
        return;
      }

      setMessage(getRandomMessage("feed"));
      await instance.post(API_ENDPOINTS.FEED(tamagotchiRes.data.id), {
        userId: userRes.data.userId,
      });
      setCharacter(getCharacterImage(tamagotchiRes.data, "happy"));
      getStatus(false);
    } catch (e) {
      console.log(e);
    }
  };

  const pet = async () => {
    try {
      const userRes = await instance.get(API_ENDPOINTS.USER);
      const [tamagotchiRes] = await Promise.all([
        instance.get(API_ENDPOINTS.TAMAGOTCHI_STATUS(userRes.data.userId)),
      ]);

      if (tamagotchiRes.data.happiness === 10) {
        setMessage("너의 사랑은 충분해!");
        return;
      }

      setMessage(getRandomMessage("pet"));
      await instance.post(API_ENDPOINTS.PET(tamagotchiRes.data.id), {
        userId: userRes.data.userId,
      });
      setCharacter(getCharacterImage(tamagotchiRes.data, "happy"));
      getStatus(false);
    } catch (e) {
      console.log(e);
    }
  };

  const walk = async () => {
    try {
      const userRes = await instance.get(API_ENDPOINTS.USER);
      const [tamagotchiRes] = await Promise.all([
        instance.get(API_ENDPOINTS.TAMAGOTCHI_STATUS(userRes.data.userId)),
      ]);

      setWalking(true);
      const initialCoin = userRes.data.coin;

      await walkAnimation(tamagotchiRes.data);
      await instance.post(API_ENDPOINTS.PLAY(tamagotchiRes.data.id), {
        userId: userRes.data.userId,
      });

      const resAfterWalk = await instance.get(API_ENDPOINTS.USER);
      const updatedCoin = resAfterWalk.data.coin;
      const coinGained = updatedCoin - initialCoin;

      setTotalCoin(updatedCoin);
      setWalking(false);

      setWalkResult(tamagotchiRes.data, coinGained);
      await getStatus(false); // 캐릭터 이미지를 업데이트하지 않음

      // 5초 후에 기본 이미지로 돌아가기
      setTimeout(() => {
        setCharacter(getCharacterImage(tamagotchiRes.data));
      }, 5000);
    } catch (e) {
      console.error("Error in walk function:", e);
      setWalking(false);
      setCharacter("");
    }
  };

  const walkAnimation = async (characterData: CharacterStatus) => {
    setCharacter(getCharacterImage(characterData, "walk1"));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCharacter(getCharacterImage(characterData, "walk2"));
    await new Promise((resolve) => setTimeout(resolve, 3000));
  };

  const setWalkResult = (
    characterData: CharacterStatus,
    coinGained: number
  ) => {
    if (coinGained > 0) {
      setCharacter(getCharacterImage(characterData, "coin"));
      setModalState({
        isOpen: true,
        isCharacterModal: true,
        text: `${characterData.nickname}(이)가 코인을 찾았어요!`,
        coin: coinGained,
        which: "coin",
        button: 1,
      });
    } else {
      setCharacter(getCharacterImage(characterData, "sad"));
      setModalState({
        isOpen: true,
        isCharacterModal: true,
        text: `${characterData.nickname}(이)가 아무것도 찾지 못했어요`,
        coin: 0,
        which: "coin",
        button: 1,
      });
    }
  };

  const cure = async () => {
    try {
      const userRes = await instance.get(API_ENDPOINTS.USER);
      const [tamagotchiRes] = await Promise.all([
        instance.get(API_ENDPOINTS.TAMAGOTCHI_STATUS(userRes.data.userId)),
      ]);

      await instance.post(API_ENDPOINTS.CURE(tamagotchiRes.data.id), {
        userId: userRes.data.userId,
      });
      setCharacter(getCharacterImage(tamagotchiRes.data, "happy"));
      getStatus(false);
    } catch (e) {
      console.log(e);
    }
  };

  const restart = async () => {
    try {
      const userRes = await instance.get(API_ENDPOINTS.USER);
      const [tamagotchiRes] = await Promise.all([
        instance.get(API_ENDPOINTS.TAMAGOTCHI_STATUS(userRes.data.userId)),
      ]);

      await instance.post(API_ENDPOINTS.RESTART(tamagotchiRes.data.id));
      getStatus();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStatus();
    onlyFirstInfo();
  }, []);

  useEffect(() => {
    setMessage(getRandomMessage(status.level));
    const messageTimer = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(messageTimer);
  }, [status.level]);

  useEffect(() => {
    const timer = setTimeout(() => setMessage(""), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    if (character === "/step1_death.gif" || character === "/step2_death.gif")
      return;
    const timer = setTimeout(() => setCharacter(""), 5000);
    return () => clearTimeout(timer);
  }, [character]);

  return {
    status,
    message,
    character,
    walking,
    day,
    timeLeft,
    totalCoin,
    todayCoin,
    modalState,
    setModalState,
    feed,
    pet,
    walk,
    cure,
    restart,
    getStatus,
  };
}
