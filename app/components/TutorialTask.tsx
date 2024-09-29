/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useCallback, useEffect } from "react";
import TodoAdd from "./TodoAdd";
import Modal from "./Modal";

const ListItem = ({ item, currentStep }: any) => {
  const [translation, setTranslation] = useState(0);
  const [click, setClick] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSwiped, setIsSwiped] = useState(false);
  const startXRef = useRef(0);
  const itemRef = useRef<HTMLLIElement>(null);
  const isButtonAreaRef = useRef(false);

  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setIsSwiped(false);
    startXRef.current = clientX;
  }, []);

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      if (isButtonAreaRef.current) return;

      const diff = startXRef.current - clientX;
      const maxTranslation = 150;

      if (diff > 0) {
        setTranslation(Math.min(diff, maxTranslation));
      } else {
        setTranslation(Math.max(diff, 0));
      }
    },
    [isDragging]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    const threshold = 75;
    if (translation > threshold) {
      setTranslation(150);
      setIsSwiped(true);
    } else {
      setTranslation(0);
      setIsSwiped(false);
    }
  }, [translation]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isButtonAreaRef.current) return;
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    handleDragEnd();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isButtonAreaRef.current) return;
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) handleDragEnd();
  };

  return (
    <div
      className={`relative flex mb-[10px] ${
        currentStep === 19 || currentStep === 20 ? "z-[180] bg-white" : ""
      }`}
    >
      <div className={`w-[5px] bg-[#${item.color}]`}></div>
      <li
        ref={itemRef}
        className="relative bg-white overflow-hidden cursor-grab active:cursor-grabbing select-none w-[348px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex items-center p-4 transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${translation}px)` }}
        >
          <div className="relative">
            <input type="checkbox" className="mr-3 opacity-0" />

            <svg
              className="absolute z-[-1] bottom-[1px]"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.4 0H1.6V0.8H0.8V1.6H0V14.4H0.8V15.2H1.6V16H14.4V15.2H15.2V14.4H16V1.6H15.2V0.8H14.4V0ZM15.2 1.6H14.4V0.8H1.6V1.6H0.8V14.4H1.6V15.2H14.4V14.4H15.2V1.6Z"
                fill="#3F3F3F"
              />
              <path
                d="M12.8004 3.19984V2.39984H3.20039V3.19984H2.40039V12.7998H3.20039V13.5998H12.8004V12.7998H13.6004V3.19984H12.8004Z"
                fill="#3F3F3F"
              />
            </svg>
          </div>
          {item.text}
        </div>
        <div
          className="absolute top-0 right-0 h-full flex transition-transform duration-300 ease-out z-10"
          style={{
            transform: isSwiped ? "translateX(0)" : "translateX(150%)",
          }}
          onMouseEnter={() => (isButtonAreaRef.current = true)}
          onMouseLeave={() => (isButtonAreaRef.current = false)}
          onTouchStart={() => (isButtonAreaRef.current = true)}
          onTouchEnd={() => (isButtonAreaRef.current = false)}
        >
          <button>
            <img src="/modify.svg" alt="edit" />
          </button>
          <button>
            <img src="/delay.svg" alt="delay" />
          </button>
          <button>
            <img src="/delete.svg" alt="delete" />
          </button>
        </div>
      </li>
    </div>
  );
};

const TutorialTask = ({ currentStep }: any) => {
  const [add, setAdd] = useState(false);
  const [simpleAdd, setSimpleAdd] = useState(currentStep === 16 ? true : false);
  const [modal, setModal] = useState(false);
  const [color, setColor] = useState("ff9b99");

  useEffect(() => {
    if (currentStep === 20) {
      setItems([
        {
          id: 1,
          text: "저녁 메뉴 장보기",
          color: "ff9b99",
          days: ["월", "화"],
          time: "09:00",
        },
        {
          id: 2,
          text: "빨래 돌리기",
          color: "78c1f6",
          days: ["월", "수", "금"],
          time: "18:30",
        },
      ]);
    }
  }, [currentStep]);

  const [items, setItems] = useState<any>([
    {
      id: 1,
      text: "저녁 메뉴 장보기",
      color: "ff9b99",
      days: ["월", "화"],
      time: "09:00",
    },
    {
      id: 2,
      text: "빨래 돌리기",
      color: color,
      days: ["월", "수", "금"],
      time: "18:30",
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const handleAddTodo = useCallback(
    (newTodo: any) => {
      setItems((prevItems: any) => {
        if (selectedItem) {
          return prevItems.map((item: any) =>
            item.id === selectedItem.id ? { ...item, ...newTodo } : item
          );
        } else {
          return [...prevItems, { ...newTodo, id: prevItems.length + 1 }];
        }
      });
      setAdd(false);
      setSelectedItem(null);
    },
    [selectedItem]
  );

  const [click, setClick] = useState(false);

  const handleCheckboxChange = useCallback(() => {
    setClick((prev) => !prev);
  }, []);

  useEffect(() => {
    if (currentStep === 16) {
      setSimpleAdd(true);
    }
    if (currentStep === 17) {
      setSimpleAdd(false);
      setAdd(true);
    }

    if (currentStep === 19) {
      setAdd(false);
    }
  }, [currentStep]);

  return (
    <>
      {!add && !simpleAdd && (
        <button
          className={`w-[350px] h-[50px] p-2 mt-2 text-gray-500 border border-gray-200 rounded-lg shadow-sm cursor-pointer text-left pl-3 ${
            currentStep === 15 || currentStep === 16 ? "z-[180] bg-white" : ""
          }`}
        >
          + 할 일 추가
        </button>
      )}

      {simpleAdd && (
        <div
          className={`relative w-[348px] mx-auto shadow-lg rounded-lg  mt-[10px] ${
            currentStep === 16 ? "z-[180] bg-white" : "bg-[#FFFFFF]"
          }`}
        >
          <div className="absolute left-[1px] top-0 w-[3px] h-[55px] bg-[#d7d7d7] rounded-lg"></div>
          <div className="pl-2">
            <div className="flex mb-[20px] mt-[5px]">
              <div className="relative w-[10px]">
                <input
                  type="checkbox"
                  className="absolute z-[1] mr-3 opacity-0 bottom-0"
                  onChange={handleCheckboxChange}
                />
                {click ? (
                  <svg
                    className="absolute z-[0] bottom-[0px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.4 0H1.6V0.8H0.8V1.6H0V14.4H0.8V15.2H1.6V16H14.4V15.2H15.2V14.4H16V1.6H15.2V0.8H14.4V0ZM15.2 1.6H14.4V0.8H1.6V1.6H0.8V14.4H1.6V15.2H14.4V14.4H15.2V1.6Z"
                      fill="#3F3F3F"
                    />
                    <path
                      d="M12.8004 3.19984V2.39984H3.20039V3.19984H2.40039V12.7998H3.20039V13.5998H12.8004V12.7998H13.6004V3.19984H12.8004Z"
                      fill="#3F3F3F"
                    />
                  </svg>
                ) : (
                  <svg
                    className="absolute z-[0] bottom-[0px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.4 0H1.6V0.8H0.8V1.6H0V14.4H0.8V15.2H1.6V16H14.4V15.2H15.2V14.4H16V1.6H15.2V0.8H14.4V0ZM15.2 1.6H14.4V0.8H1.6V1.6H0.8V14.4H1.6V15.2H14.4V14.4H15.2V1.6Z"
                      fill="#3F3F3F"
                    />
                  </svg>
                )}
              </div>
              <span className="border-b border-[#a5a5a5] w-[269px] mr-[8px] focus:outline-none ml-[20px] pt-[15px]">
                강아지 산책
              </span>
              <span className="text-[30px] h-[30px]">+</span>
            </div>
          </div>
        </div>
      )}

      {add && (
        <div
          className={`${
            currentStep === 17 || currentStep === 18 ? "z-[180]" : ""
          }`}
        >
          <TodoAdd
            tutorial={true}
            setAdd={setAdd}
            initialData={{
              id: 0,
              text: "강아지 산책",
              color: "RED",
              days: [],
              time: "10:00",
            }}
          />
        </div>
      )}

      <div className={`w-[380px] mx-auto p-4 rounded-lg shadow-lg `}>
        <ul className="bg-gray-100 rounded-lg overflow-hidden">
          {items.map((item: any, index: number) => (
            <ListItem key={index} item={item} currentStep={currentStep} />
          ))}
        </ul>
      </div>
      {modal && <Modal setModal={setModal} text="" />}
    </>
  );
};

export default TutorialTask;