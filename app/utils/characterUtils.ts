// characterUtils.ts

import { CharacterStatus } from "../types/types";

export function getCharacterImage(
  characterData: CharacterStatus,
  state: string = "default"
): string {
  const { level } = characterData;

  const images = {
    egg: {
      default: "/egg.gif",
      cracking: "/egg_cracking.gif",
    },
    baby: {
      default: "/step1_default.gif",
      happy: "/step1_happy.gif",
      sad: "/step1_sad.gif",
      walk1: "/babyWalk.gif",
      walk2: "/babyWalk2.gif",
      coin: "/babyCoin.gif",
      death: "/step1_death.gif",
    },
    adult: {
      default: "/step2_default.gif",
      happy: "/step2_happy.gif",
      sad: "/step2_sad.gif",
      walk1: "/adultWalk2.gif",
      walk2: "/adultWalk.gif",
      coin: "/adultCoin.gif",
      death: "/step2_death.gif",
    },
  };

  if (level === "egg" && state in images.egg) {
    return images.egg[state as keyof typeof images.egg];
  } else if (level === "baby" && state in images.baby) {
    return images.baby[state as keyof typeof images.baby];
  } else if (level === "adult" && state in images.adult) {
    return images.adult[state as keyof typeof images.adult];
  }

  return images[level as keyof typeof images].default;
}

export function getRandomMessage(type: string): string {
  const messages = {
    egg: [
      "이 순간을 만끽하고 있어!",
      "너를 위해 내가 더 귀여워질게, 기대해!",
      "너는 나의 소중한 친구야.",
      "몸이 막 근질근질해!",
      "너와 함께 할 수 있어 정말 행복해!",
      "내 목소리 들리니?",
    ],
    baby: [
      "너의 사랑이 필요해!",
      "내가 이렇게 귀여운 건 네 덕분이야!",
      "너를 생각하면서 놀고 있었어.",
      "내가 최고의 강아지라는 건 모두가 알아!",
      "너와 함께하는 매일이 소중해.",
      "산책 가는 건 나의 특권이야!",
      "내가 귀여운 건 대체로 사실이야.",
    ],
    adult: [
      "어른 강아지로서 품격을 지켜야 해.",
      "나의 성숙한 매력에 빠져봐!",
      "너는 나의 소중한 친구야.",
      "너와 함께하는 매일이 소중해.",
      "꾸준한 모습 진짜 멋져, 내 자랑이야!",
      "일 끝나면 나랑 산책하러 가자, 약속이야!",
      "일할 때 나도 옆에서 응원해 줄게!",
      "내 귀여움이 힘이 돼.",
    ],
    feed: ["냠냠, 고마워!", "더 먹고 싶어, 멍멍!", "이거 먹고 뛰어놀 거야!!"],
    pet: [
      "너무 포근해, 사랑해!",
      "이 느낌, 정말 최고야!",
      "너무 포근해, 사랑해!",
    ],
    hunger: ["힘이 없어, 배고파", "배가 꼬르륵-!", "밥 먹고 싶어, 멍!"],
  };

  const messageList = messages[type as keyof typeof messages] || messages.baby;
  const randomIndex = Math.floor(Math.random() * messageList.length);
  return messageList[randomIndex];
}
