/* eslint-disable @next/next/no-img-element */

"use client";

export default function Page() {
  const loginKakao = () => {
    location.href = "https://todogochi.store/auth/sign-in/kakao";
  };

  return (
    <div className="bg-[#EDEDED] h-screen flex justify-center items-center">
      <div className="w-[390px] max-xs:w-full max-xs:h-full h-[844px] flex flex-col justify-center mx-auto items-center">
        <div className="flex justify-start pl-[10px] w-full">
          <img
            className="w-[136px] h-[32px] mb-[13px]"
            src="/logo.png"
            alt="logo"
          />
        </div>
        <div className="flex justify-start w-full pl-[10px]">
          <div className="text-[#3f3f3f] text-[35px] font-normal font-neodunggeunmo mb-[35px]">
            오늘의 할 일은?
          </div>
        </div>
        <div className="mb-[10px] text-[#3f3f3f] text-xs font-normal font-neodunggeunmo">
          이메일
        </div>
        <input
          placeholder="example@example.com"
          className="p-[10px] w-[350px] h-[45px] text-[15px] font-normal font-['SUIT'] mb-[20px] rounded-lg"
        />

        <div className="text-[#3f3f3f] text-xs font-normal font-neodunggeunmo mb-[10px]">
          비밀번호
        </div>

        <input
          placeholder="비밀번호를 입력하세요"
          className="p-[10px] bg-[#FAFAFA] w-[350px] h-[45px] text-[15px] font-normal font-['SUIT'] mb-[30px] rounded-lg"
        />

        <div className="w-[350px] h-[45px] relative bg-[#3f3f3f] rounded-lg cursor-pointer">
          <div className="w-[52.50px] left-[149px] top-[14px] absolute text-[#f2f2f2] text-base font-normal font-['NeoDunggeunmo Pro']">
            로그인
          </div>
        </div>

        <div className="flex justify-center text-[#7f7f7f] text-xs font-normal font-neodunggeunmo mb-[10px] w-[350px]">
          SNS 계정으로 간편하게 로그인
        </div>
        <div
          className="w-[350px] h-[45px] px-3.5 bg-[#fee500] rounded-md justify-center items-center inline-flex cursor-pointer"
          onClick={loginKakao}
        >
          <div className="px-[82px] justify-center items-center gap-2 flex">
            <div className="w-[18px] h-[18px] relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
              >
                <g id="ì¹´ì¹´ì¤ ë¡ê³ " clipPath="url(#clip0_90_76)">
                  <path
                    id="Path"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.00002 1.09998C4.02917 1.09998 0 4.21293 0 8.05226C0 10.44 1.5584 12.5449 3.93152 13.7969L2.93303 17.4445C2.84481 17.7668 3.21341 18.0237 3.49646 17.8369L7.87334 14.9482C8.2427 14.9838 8.61808 15.0046 9.00002 15.0046C13.9705 15.0046 17.9999 11.8918 17.9999 8.05226C17.9999 4.21293 13.9705 1.09998 9.00002 1.09998"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_90_76">
                    <rect
                      width="17.9999"
                      height="18"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="text-black/90 text-[15px] font-semibold font-['Apple SD Gothic Neo'] leading-snug">
              카카오 로그인
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
