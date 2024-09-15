"use client";

import { useState } from "react";
import CalendarModal from "./CalendarModal";

export default function Modal({ setModal }: any) {
  const [modal2, setModal2] = useState(false);
  return (
    <div
      className="fixed inset-0 bg-black/50 z-[110] flex justify-center items-center"
      onClick={() => setModal(false)}
    >
      <div
        className={`w-[330px] h-[120px] relative ${modal2 ? "opacity-0" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[330px] h-[120px] bg-[#ededed] rounded-[15px] shadow flex-col flex justify-center items-center">
          <div className="w-[150px] h-5 text-center text-[#3f3f3f] text-[15px] font-bold font-['SUIT'] mb-[16px] mt-[21px]">
            할 일을 미루시겠어요?
          </div>
          <div className="flex">
            <div
              className="cursor-pointer w-[110px] h-[35px] px-[15px] py-[7px] text-center text-[#3f3f3f] text-xs font-semibold font-['SUIT'] bg-[#f9f9f9] mr-[10px] rounded-lg flex justify-center items-center"
              onClick={() => {}}
            >
              다음 날
            </div>
            <div
              className="cursor-pointer w-[110px] h-[35px] px-[15px] py-[7px]   text-center text-[#3f3f3f] text-xs font-semibold font-['SUIT'] bg-[#f9f9f9] rounded-lg flex justify-center items-center"
              onClick={() => {
                setModal2(true);
              }}
            >
              날짜 선택
            </div>
          </div>
        </div>
      </div>
      {modal2 && <CalendarModal setModal2={setModal2} setModal={setModal} />}
    </div>
  );
}
