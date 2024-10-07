"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="bg-[#EDEDED] flex items-center justify-center min-h-screen h-full  max-xs:w-full max-xs:h-full relative flex-col">
      <div className="relative w-[390px] max-xs:w-full mt-[112px] h-[844px] px-[25px]">
        <div className="flex justify-between mb-[40px]">
          <div className="font-neodunggeunmo text-[25px]">설정</div>
          <svg
            className="cursor-pointer"
            onClick={() => router.back()}
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
        <div
          className="flex justify-between items-center bg-[#FAFAFA] w-[350px]  max-xs:w-full h-[50px] px-[20px] rounded-[5px] mb-[10px] cursor-pointer"
          onClick={() => router.push("/settings/account")}
        >
          <div className="">계정</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="15"
            viewBox="0 0 8 15"
            fill="none"
          >
            <path
              d="M1 1.74846e-07L0 0L-2.62268e-06 15L0.999997 15L0.999998 14L2 14L2 13L3 13L3 12L4 12L4 11L5 11L5 10L6 10L6 9L7 9L7 8L8 8L8 7L7 7L7 6L6 6L6 5L5 5L5 4L4 4L4 3L3 3L3 2L2 2L2 1L1 1L1 1.74846e-07Z"
              fill="#737373"
            />
          </svg>
        </div>
        <div
          className="flex justify-between items-center bg-[#FAFAFA] w-[350px] max-xs:w-full max-xs:w-full h-[50px] px-[20px] rounded-[5px] mb-[10px] cursor-pointer"
          onClick={() => router.push("/settings/reward")}
        >
          <div className="">리워드</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="15"
            viewBox="0 0 8 15"
            fill="none"
          >
            <path
              d="M1 1.74846e-07L0 0L-2.62268e-06 15L0.999997 15L0.999998 14L2 14L2 13L3 13L3 12L4 12L4 11L5 11L5 10L6 10L6 9L7 9L7 8L8 8L8 7L7 7L7 6L6 6L6 5L5 5L5 4L4 4L4 3L3 3L3 2L2 2L2 1L1 1L1 1.74846e-07Z"
              fill="#737373"
            />
          </svg>
        </div>
        <div className="flex justify-between items-center bg-[#FAFAFA] max-xs:w-full w-[350px] max-xs:w-full h-[50px] px-[20px] rounded-[5px] ">
          <div className="">서비스 정보</div>
          <div className="text-[#A6A6A6]">ver 0.1</div>
        </div>
      </div>
    </div>
  );
}
