/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import CalendarModal from "./CalendarModal";
import { instance } from "../utils/axios";

interface PropsType {
  setModal: (args: boolean) => void;
  text: string;
  tutorial?: boolean;
  items: any;
  id: number;
  getData: () => void;
}

export default function Modal({
  setModal,
  text,
  tutorial,
  items,
  id,
  getData,
}: PropsType) {
  const getTomorrow = async () => {
    const res: any = await instance.get("/user");
    const item = items.filter((el: any) => el.id === id)[0];

    instance.put(`/todolist/update/${id}`, {
      userId: res.data.userId,
      todoText: item.text,
      colorTag: item.colorTag,
      targetDate: parseInt(item.date) + 1,
      targetTime: item.time,
    });
    setModal(false);
    getData();
  };

  const [modal2, setModal2] = useState(false);
  return (
    <div
      className="fixed inset-0 bg-black/50 z-[190] flex justify-center items-center"
      onClick={() => setModal(false)}
    >
      <div
        className={`w-[330px]  ${
          tutorial ? "h-[160px]" : "h-[120px]"
        } relative ${modal2 ? "opacity-0" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`w-[330px]  bg-[#ededed] rounded-[15px] shadow flex-col flex  ${
            tutorial
              ? "h-[160px]  items-center"
              : "h-[120px] justify-center items-center"
          }`}
        >
          <div
            className={`w-[165px]  text-center text-[#3f3f3f] text-[15px] font-bold font-['SUIT'] mb-[16px] ${
              tutorial ? "mt-[15px] mb-[15px]" : "mt-[21px]"
            }`}
          >
            {text !== "" ? text : "할 일을 미루시겠어요?"}
          </div>

          {tutorial && (
            <div className="flex mb-[15px]">
              <img src="/coin.svg" alt="coin" />
              <span className="ml-[4px] ">2</span>
            </div>
          )}

          <div className="flex">
            <div
              className="cursor-pointer w-[110px] h-[35px] px-[15px] py-[7px] text-center text-[#3f3f3f] text-xs font-semibold font-['SUIT'] bg-[#f9f9f9] mr-[10px] rounded-lg flex justify-center items-center"
              onClick={
                !tutorial
                  ? () => {
                      getTomorrow();
                    }
                  : () => setModal(false)
              }
            >
              다음 날
            </div>
            <div
              className="cursor-pointer w-[110px] h-[35px] px-[15px] py-[7px]   text-center text-[#3f3f3f] text-xs font-semibold font-['SUIT'] bg-[#f9f9f9] rounded-lg flex justify-center items-center"
              onClick={
                !tutorial
                  ? () => {
                      setModal2(true);
                    }
                  : () => setModal(false)
              }
            >
              날짜 선택
            </div>
          </div>
        </div>
      </div>
      {modal2 && (
        <CalendarModal
          setModal2={setModal2}
          setModal={setModal}
          text=""
          items={items}
          id={id}
          getData={getData}
        />
      )}
    </div>
  );
}
