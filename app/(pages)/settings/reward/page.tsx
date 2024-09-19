/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="bg-[#EDEDED] flex items-center justify-center min-h-screen h-full  max-xs:w-full max-xs:h-full relative flex-col">
      <div className="relative w-[390px] mt-[112px] h-[844px] px-[25px]">
        <div className="flex justify-between mb-[40px]">
          <div className="flex items-center">
            <svg
              onClick={() => router.back()}
              className="mr-[12px] cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="15"
              viewBox="0 0 8 15"
              fill="none"
            >
              <path
                d="M7 15L8 15L8 0L7 -8.74228e-08L7 1L6 1L6 2L5 2L5 3L4 3L4 4L3 4L3 5L2 5L2 6L1 6L1 7L6.99382e-07 7L6.11959e-07 8L1 8L1 9L2 9L2 10L3 10L3 11L4 11L4 12L5 12L5 13L6 13L6 14L7 14L7 15Z"
                fill="#737373"
              />
            </svg>
            <div className="font-neodunggeunmo text-[25px] mr-[14px]">
              리워드
            </div>
            <div className="text-[10px] text-[#A6A6A6]">
              최근 7일간 기록이 보관됩니다.
            </div>
          </div>
          <svg
            className="cursor-pointer"
            onClick={() => router.push("/main")}
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.1421 1.41421L12.7279 0L7.07115 5.65677L1.4854 0.071016L0.0711836 1.48523L5.65694 7.07098L0 12.7279L1.41421 14.1421L7.07115 8.4852L12.7991 14.2132L14.2133 12.7989L8.48536 7.07098L14.1421 1.41421Z"
              fill="#3F3F3F"
            />
          </svg>
        </div>
        <div className="flex items-center">
          <img src="/coin.svg" alt="coin" />
          <div className="text-[12px] ml-[5px] mr-[10px]">Total Coin</div>
          <div className="text-[12px]">10</div>
        </div>
        <div className="flex flex-col  bg-[#FAFAFA] w-[350px] px-[20px] rounded-[5px] mb-[10px] min-h-[100px] mt-[12px] ">
          <div className="font-semibold p-[20px]">2024년 10월 30일</div>
          <div className="flex items-center justify-between">
            <div className="text-[#3F3F3F] ml-[10px]">보너스 코인</div>
            <div className="text-[#A6A6A6] mr-[10px]">+2</div>
          </div>
          <div className="mx-[5px] h-[1px] w-[300px] bg-[#D8D8D8] mt-[15px] mb-[15px]"></div>

          <div className="flex items-center justify-between">
            <div className="text-[#3F3F3F] ml-[10px]">보너스 코인</div>
            <div className="text-[#A6A6A6] mr-[10px]">+2</div>
          </div>
          <div className="mx-[5px] h-[1px] w-[300px] bg-[#D8D8D8] mt-[15px] mb-[15px]"></div>

          <div className="flex items-center justify-between">
            <div className="text-[#3F3F3F] ml-[10px]">보너스 코인</div>
            <div className="text-[#A6A6A6] mr-[10px]">+2</div>
          </div>
          <div className="mx-[5px] h-[1px] w-[300px] bg-[#D8D8D8] mt-[15px] mb-[15px]"></div>
        </div>
      </div>
    </div>
  );
}
