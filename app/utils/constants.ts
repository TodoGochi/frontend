// constants.ts

export const API_ENDPOINTS = {
  USER: "/user",
  TAMAGOTCHI_STATUS: (userId: number) => `/tamagotchi/${userId}/status`,
  LEVEL_PROGRESS: (userId: number) => `/tamagotchi/${userId}/level-progress`,
  COIN_TRANSACTIONS: (userId: number) => `/user/${userId}/coin-transactions`,
  LEVEL_UP_EFFECT: (tamagotchiId: number, level: number) =>
    `/tamagotchi/${tamagotchiId}/levelupeffect/${level}`,
  FEED: (tamagotchiId: number) => `/tamagotchi/${tamagotchiId}/feed`,
  PET: (tamagotchiId: number) => `/tamagotchi/${tamagotchiId}/pet`,
  PLAY: (tamagotchiId: number) => `/tamagotchi/${tamagotchiId}/play`,
  CURE: (tamagotchiId: number) => `/tamagotchi/${tamagotchiId}/cure`,
  RESTART: (tamagotchiId: number) => `/tamagotchi/${tamagotchiId}/restart`,
};
