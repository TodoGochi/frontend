/* eslint-disable @next/next/no-img-element */
"use client";

export default function Page() {
  return (
    <div className="bg-[#ededed] flex items-center justify-center h-screen w-screen max-xs:w-full max-xs:h-full">
      <div className="absolute top-[10vh] w-[360px]  h-[300px]">
        <img src="/room.png" className="absolute z-1" alt="room" />
        <div className=" inset-0 flex items-start justify-center absolute z-[101] top-[10px] ">
          <div className="relative  flex flex-col justify-center items-center">
            <div className="flex items-center">
              <img src="/coin.svg" alt="coin" />
              <span className="font-neodunggeunmo mr-[13px] ml-[3px]">10</span>
              <span className="font-neodunggeunmo mr-[8px]">Day 2</span>
              <img src="/energy.png" alt="energy" className="mr-[8px]" />
              <img src="/heart.png" alt="heart" />
              <img src="/heart.png" alt="heart" />
              <img src="/heart.png" alt="heart" />
              <img src="/heart.png" alt="heart" />
              <img src="/heart.png" alt="heart" />
            </div>
          </div>
        </div>
        <div className="absolute flex justify-center items-center left-[7px] bottom-[10px]">
          <div className="flex space-x-[8px]">
            <div className="relative cursor-pointer">
              <img src="/button.png" alt="button" />
              <img
                className="absolute z-[2] top-[2px] left-[21px]"
                src="/food.png"
                alt="button"
              />
            </div>
            <div className="relative cursor-pointer">
              <img src="/button.png" alt="button" />
              <img
                className="absolute z-[2] top-[2px] left-[21px]"
                src="/cute.png"
                alt="button"
              />
            </div>
            <div className="relative cursor-pointer">
              <img src="/button.png" alt="button" />
              <img
                className="absolute z-[2] top-[2px] left-[21px]"
                src="/go.png"
                alt="button"
              />
            </div>
            <div className="relative cursor-pointer">
              <img src="/disableButton.png" alt="button" />
              <img
                className="absolute z-[2] top-[2px] left-[21px]"
                src="/fix.png"
                alt="button"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
