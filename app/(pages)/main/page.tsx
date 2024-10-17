"use client";
import React, { useEffect, useState } from "react";
import { instance } from "@/app/utils/axios";
import Header from "@/app/components/Header";
import Character from "@/app/components/Character";
import Controls from "@/app/components/Controls";
import TaskList from "@/app/components/TaskList";

import GochiModal from "@/app/components/GotchiModal";
import { useCharacter } from "@/app/hooks/useCharacter";

export default function Page() {
  const {
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
  } = useCharacter();

  const [month, setMonth] = useState(false);
  const [sized, setSized] = useState(false);

  useEffect(() => {
    getStatus();
  }, []);

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

  return (
    <div className="bg-black flex items-center min-h-screen h-full max-xs:w-full max-xs:h-full relative flex-col">
      <div className="bg-[#3f3f3f] flex justify-center flex-col items-center">
        <div
          className={`relative min-w-[360px] max-xs:w-full mt-[30px] h-[300px] ${
            sized ? "z-[129]" : ""
          }`}
        >
          <Character
            status={status}
            character={character}
            message={message}
            timeLeft={timeLeft}
            walking={walking}
            totalCoin={totalCoin}
            day={day}
          />

          <Controls
            status={status}
            feed={feed}
            pet={pet}
            walkModal={walkModal}
            cureModal={cureModal}
          />

          {characterModal && (
            <GochiModal
              text={modalText}
              setModal={setCharacterModal}
              coin={modalCoin}
              button={button}
              restart={restart}
              cure={cure}
              buttonText="REVIVE"
              which={which}
              totalCoin={totalCoin}
            />
          )}
        </div>

        <TaskList
          sized={sized}
          setSized={setSized}
          month={month}
          setMonth={setMonth}
          todayCoin={todayCoin}
        />
      </div>
    </div>
  );
}
