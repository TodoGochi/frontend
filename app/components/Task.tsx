/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useCallback } from "react";
import TodoAdd from "./TodoAdd";
import Modal from "./Modal";

const COLOR: { [key: string]: string } = {
  red: "bg-[#FF9B99]",
  blue: "bg-[#79C2F7]",
};

interface ListItemProps {
  text: string;
  onEdit: () => void;
  onDelete: () => void;
  onDelay: () => void;
  color: string;
}

interface TodoItem {
  id: number;
  text: string;
  color: string;
}

const ListItem: React.FC<ListItemProps> = ({
  text,
  onEdit,
  onDelete,
  onDelay,
  color,
}) => {
  const [translation, setTranslation] = useState(0);
  const [click, setClick] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSwiped, setIsSwiped] = useState(false);
  const startXRef = useRef(0);
  const itemRef = useRef<HTMLLIElement>(null);
  const isButtonAreaRef = useRef(false); // 버튼 영역인지 여부 추적

  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setIsSwiped(false);
    startXRef.current = clientX;
  }, []);

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      if (isButtonAreaRef.current) return; // 버튼 영역에서는 스와이프 불가

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
    if (isButtonAreaRef.current) return; // 버튼 영역에서는 스와이프 시작 안 함
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    handleDragEnd();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isButtonAreaRef.current) return; // 버튼 영역에서는 스와이프 시작 안 함
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);

  const handleMouseUp = (e: React.MouseEvent) => handleDragEnd();

  const handleMouseLeave = () => isDragging && handleDragEnd();

  const handleButtonClick = (
    e: React.MouseEvent | React.TouchEvent,
    callback: () => void
  ) => {
    e.stopPropagation();
    callback();
  };

  return (
    <div className="flex mb-[10px]">
      <div className={` w-[5px] ${COLOR[color]}`}></div>
      <li
        ref={itemRef}
        className="relative bg-white overflow-hidden cursor-grab active:cursor-grabbing select-none  w-[348px]"
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
            <input
              type="checkbox"
              className="mr-3 opacity-0"
              onChange={() => setClick(!click)}
            />
            {click ? (
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
            ) : (
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
              </svg>
            )}
          </div>

          {text}
        </div>
        <div
          className="absolute top-0 right-0 h-full flex transition-transform duration-300 ease-out z-10"
          style={{
            transform: isSwiped ? "translateX(0)" : "translateX(150%)",
          }}
          onMouseEnter={() => (isButtonAreaRef.current = true)} // 버튼 영역에 들어갈 때 스와이프 방지
          onMouseLeave={() => (isButtonAreaRef.current = false)} // 버튼 영역을 벗어나면 스와이프 가능
          onTouchStart={() => (isButtonAreaRef.current = true)} // 버튼 영역 터치 시작 시
          onTouchEnd={() => (isButtonAreaRef.current = false)} // 버튼 영역 터치 종료 시
        >
          <button onClick={(e) => handleButtonClick(e, onEdit)}>
            <img src="/modify.svg" alt="edit" />
          </button>
          <button onClick={(e) => handleButtonClick(e, onDelay)}>
            <img src="/delay.svg" alt="delay" />
          </button>
          <button onClick={(e) => handleButtonClick(e, onDelete)}>
            <img src="/delete.svg" alt="delete" />
          </button>
        </div>
      </li>
    </div>
  );
};

const SwipeActionList: React.FC = () => {
  const [add, setAdd] = useState(false);
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState<TodoItem[]>([
    { id: 1, text: "저녁 메뉴 장보기", color: "red" },
    { id: 2, text: "운동하기", color: "red" },
    { id: 3, text: "책 읽기", color: "blue" },
  ]);

  const addTask = () => {
    setAdd(true);
  };

  const handleEdit = (index: number) => {
    console.log(`Edit item at index ${index}`);
  };

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id)); // ID 기반으로 삭제
  };

  const handleDelay = () => {
    setModal(true);
  };

  return (
    <>
      <div className="w-[380px] mx-auto p-4  rounded-lg shadow-lg">
        <div className="flex justify-between items-center pb-4">
          <div className="text-lg font-bold text-gray-800 flex">
            <img src="/coin.svg" alt="coin" className="mr-[5px]" />
            <span className="font-neodunggeunmo text-[12px]">Today Coin</span>
            <span className="font-neodunggeunmo ml-[5px] text-[12px]">2</span>
          </div>
          <div className="text-sm text-gray-600 flex cursor-pointer">
            <img src="/list.svg" alt="list" className="mr-[5px]" />
            컬러 태그 순
          </div>
        </div>
        <ul className="bg-gray-100 rounded-lg overflow-hidden">
          {items.map((item) => (
            <ListItem
              key={item.id} // 고유한 ID를 key로 사용
              text={item.text}
              color={item.color}
              onEdit={() => handleEdit(item.id)}
              onDelete={() => handleDelete(item.id)}
              onDelay={() => handleDelay()}
            />
          ))}
        </ul>
        {!add && (
          <button
            onClick={addTask}
            className="w-full p-2 mt-2 text-gray-500 border border-gray-200 rounded-lg text-center shadow-sm"
          >
            + 할 일 추가
          </button>
        )}
        {add && <TodoAdd setAdd={setAdd} />}
      </div>
      {modal && <Modal setModal={setModal} />}
    </>
  );
};

export default SwipeActionList;
