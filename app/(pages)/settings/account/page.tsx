"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */
export default function Page() {
  const router = useRouter();

  const [isAutoLogin, setIsAutoLogin] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsAutoLogin(true);
    }
  }, []);

  const handleToggle = () => {
    const newAutoLoginState = !isAutoLogin;
    setIsAutoLogin(newAutoLoginState);

    if (newAutoLoginState) {
      // 자동 로그인 켜짐: accessToken을 localStorage에 저장
      const currentAccessToken = sessionStorage.getItem("accessToken");
      if (currentAccessToken) {
        localStorage.setItem("accessToken", currentAccessToken);
        sessionStorage.removeItem("accessToken");
      }
    } else {
      // 자동 로그인 꺼짐: accessToken을 localStorage에서 sessionStorage로 이동
      const currentAccessToken = localStorage.getItem("accessToken");
      if (currentAccessToken) {
        sessionStorage.setItem("accessToken", currentAccessToken);
        localStorage.removeItem("accessToken");
      }
    }
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("accessToken");
    router.push("/signin");
  };

  return (
    <div className="bg-black flex items-center justify-center min-h-screen h-full  max-xs:w-full max-xs:h-full relative flex-col">
      <div className="relative bg-[#EDEDED] desktop:w-[390px] max-xs:w-full pt-[112px] h-[844px] px-[25px]">
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
            <div className="font-neodunggeunmo text-[25px]">계정</div>
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
        <div className="w-[350px] h-[100px]  bg-[#FAFAFA] max-xs:w-full rounded-[5px] flex  items-center px-[20px] mb-[10px]">
          <div className="flex items-center">
            <img src="/profile.png" alt="profile" className="mr-[20px]" />
            <div>
              <div className="text-[18px] font-semibold mb-[6px]">투두고치</div>
              <div className="text-[12px]"> dldyddlwl1@naver.com</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center max-xs:w-full bg-[#FAFAFA] w-[350px] h-[50px] px-[20px] rounded-[5px] mb-[10px] cursor-pointer">
          <div className="">로그인 정보</div>
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
        <div className="flex justify-between items-center bg-[#FAFAFA] max-xs:w-full w-[350px] h-[50px] px-[20px] rounded-[5px] mb-[10px] cursor-pointer">
          <div className="">계정 관리</div>
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
        <div className="flex justify-between items-center bg-[#FAFAFA] max-xs:w-full w-[350px] h-[50px] px-[20px] rounded-[5px] mb-[10px] cursor-pointer">
          <div className="">자동 로그인 관리</div>
          <div
            onClick={handleToggle}
            className="rounded-lg flex items-center justify-center"
          >
            <div
              className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
                isAutoLogin ? "bg-[#3F3F3F]" : "bg-gray-300"
              }`}
              onClick={() => setIsAutoLogin(!isAutoLogin)}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                  isAutoLogin ? "translate-x-6" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
        <div
          className="flex justify-between items-center bg-[#FAFAFA] max-xs:w-full w-[350px] h-[50px] px-[20px] rounded-[5px] mb-[10px] cursor-pointer"
          onClick={logout}
        >
          <div className="">로그아웃</div>
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
      </div>
    </div>
  );
}
