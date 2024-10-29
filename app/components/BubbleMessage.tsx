/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";

const MessageBubble = ({ message }: any) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // 이미지 프리로딩
    const img = new Image();
    img.src = "speech.png";
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  // 이미지가 로드되고 메시지가 있을 때만 컨텐츠를 보여줌
  useEffect(() => {
    if (imageLoaded && message) {
      setShowContent(true);
    } else {
      setShowContent(false);
    }
  }, [imageLoaded, message]);

  if (!showContent) return null;

  return (
    <div className="absolute z-[135] top-1/2 -translate-y-[185%] w-[80%] max-w-[300px] translate-x-[11%]">
      <div className="relative">
        <img src="speech.png" className="w-full h-auto" alt="speech" />
        <svg
          className="absolute bottom-[12px] right-[5%] animate-fade"
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="8"
          viewBox="0 0 15 8"
          fill="none"
        >
          <path
            d="M15 1L15 0L0 -6.55671e-07L-4.37114e-08 0.999999L1 0.999999L1 2L2 2L2 3L3 3L3 4L4 4L4 5L5 5L5 6L6 6L6 7L7 7L7 8L8 8L8 7L9 7L9 6L10 6L10 5L11 5L11 4L12 4L12 3L13 3L13 2L14 2L14 1L15 1Z"
            fill="#737373"
          />
        </svg>
        <div className="font-neodunggeunmo text-[12px] absolute top-[50%] left-[20px] transform -translate-y-1/2 w-[calc(100%-40px)]">
          {message}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
