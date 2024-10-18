// types.ts

export interface CharacterStatus {
  user_id: number;
  level: string;
  health_status: string;
  nickname: string;
  happiness: number;
  created_at: string;
  sick_at: string;
  hunger: number;
  experience: {
    user_id: number;
    feed: number;
    play: number;
    pet: number;
  };
  levelEffects?: {
    level: number;
    effectApplied: boolean;
  }[];
  id?: number;
}

export interface TimeLeft {
  hour: number;
  min: number;
  sec: number;
}

export interface ModalState {
  isOpen: boolean;
  button: number;
  coin: number;
  buttonText?: string;
  text: string;
  which: string;
  isCharacterModal: boolean;
}
