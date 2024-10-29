"use client";
import React, { useEffect, useState } from "react";
import { instance } from "@/app/utils/axios";
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
    modalState,
    setModalState,
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
  }, [getStatus]);

  const cureModal = async () => {
    const res = await instance.get("/user");
    const resGotchi = await instance.get(
      `/tamagotchi/${res.data.userId}/status`
    );

    setModalState({
      isOpen: true,
      isCharacterModal: true,
      text: `${resGotchi.data.nickname}(이)가 아파요. \n 치료 하시겠어요?`,
      coin: -3,
      button: 1,
      which: "cure",
    });
  };

  const walkModal = async () => {
    const res = await instance.get("/user");
    const resGotchi = await instance.get(
      `/tamagotchi/${res.data.userId}/status`
    );

    if (res.data.coin === 0) {
      alert("코인이 부족해 멍...");
      return;
    }

    if (resGotchi.data.health_status === "sick") {
      walk();
    } else {
      setModalState({
        isOpen: true,
        isCharacterModal: true,
        text: `${resGotchi.data.nickname}(이)가 산책을 떠나요`,
        coin: 0,
        button: 1,
        which: "cured",
      });
      walk();
    }
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

          {modalState.isOpen && modalState.isCharacterModal && (
            <GochiModal
              text={modalState.text}
              setModal={(isOpen: any) =>
                setModalState((prev) => ({ ...prev, isOpen }))
              }
              coin={modalState.coin}
              button={modalState.button}
              restart={restart}
              cure={cure}
              buttonText={modalState.buttonText || "REVIVE"}
              which={modalState.which}
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
