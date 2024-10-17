"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { instance } from "../utils/axios";
import TodoAdd from "./TodoAdd";

interface ListItemProps {
  id: number;
  text: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDelay: (id: number) => void;
  color: string;
  onSelect: (id: number) => void;
  item: any;
  getData: () => void;
  setModal3: (args: boolean) => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  id,
  text,
  onEdit,
  onDelete,
  onDelay,
  color,
  onSelect,
  item,
  getData,
  setModal3,
}) => {
  const [translation, setTranslation] = useState(0);
  const [click, setClick] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSwiped, setIsSwiped] = useState(false);
  const startXRef = useRef(0);
  const itemRef = useRef<HTMLLIElement>(null);
  const isButtonAreaRef = useRef(false);

  const [clickEdit, setClickEdit] = useState(false);

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

  // Define specific button handlers
  const handleEditClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    onSelect(id);
    setClickEdit(!clickEdit);
  };

  const handleDeleteClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      onDelete(id);
    },
    [id, onDelete]
  );

  const handleDelayClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      onDelay(id);
    },
    [onDelay, id]
  );

  const handleCheckboxChange = async () => {
    setClick(true);
    const res: any = await instance.get("/user");
    const postRes: any = await instance.post(
      `todolist/complete/${res.data.userId}/${id}`
    );
    if (postRes.data.rewardCoin === 3) {
      setModal3 && setModal3(true);
    }
    getData();
  };

  useEffect(() => {
    setClick(!!item.status);
  }, []);

  return (
    <>
      {!clickEdit ? (
        <div className="mb-[10px] flex flex-shrink-0 flex-grow-0 ">
          <div
            className={`min-w-[5px] bg-[#${color}] rounded-bl-[5px] rounded-tl-[5px]`}
          ></div>
          <li
            ref={itemRef}
            className="relative bg-white overflow-hidden cursor-grab active:cursor-grabbing select-none min-w-[345px]  isolate rounded-tr-[5px] rounded-br-[5px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="flex items-center p-4 transition-transform duration-300 ease-out "
              style={{ transform: `translateX(-${translation}px)` }}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  className="mr-3 opacity-0"
                  onChange={handleCheckboxChange}
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
              className="absolute top-0 right-0 h-full flex transition-transform duration-300 ease-out z-10 "
              style={{
                transform: isSwiped ? "translateX(0)" : "translateX(150%)",
              }}
              onMouseEnter={() => (isButtonAreaRef.current = true)}
              onMouseLeave={() => (isButtonAreaRef.current = false)}
              onTouchStart={() => (isButtonAreaRef.current = true)}
              onTouchEnd={() => (isButtonAreaRef.current = false)}
            >
              <button onClick={handleEditClick}>
                <img src="/modify.svg" alt="edit" />
              </button>
              <button onClick={handleDelayClick}>
                <img src="/delay.svg" alt="delay" />
              </button>
              <button
                onClick={handleDeleteClick}
                className=" rounded-tr-[5px] rounded-br-[5px]"
              >
                <img src="/delete.svg" alt="delete" />
              </button>
            </div>
          </li>
        </div>
      ) : (
        <div className="mb-[30px]">
          <TodoAdd
            getData={getData}
            edit={true}
            id={id}
            initialData={item}
            setAdd={setClickEdit}
          />
        </div>
      )}
    </>
  );
};
