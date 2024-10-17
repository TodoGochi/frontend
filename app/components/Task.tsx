/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useCallback, useEffect } from "react";
import TodoAdd from "./TodoAdd";
import Modal from "./Modal";
import { instance } from "../utils/axios";
import { useStore } from "../store/date";
import { ListItem } from "./ListItem";

interface TodoItem {
  id: number;
  text: string;
  color: string;
  days: string[];
  time: string;
  status: boolean;
  date: string;
  colorTag: string;
}

const colorTagToColor: { [key: string]: string } = {
  RED: "ff9b99",
  ORANGE: "fdc38e",
  YELLOW: "f7e583",
  GREEN: "a6e091",
  BLUE: "78c1f6",
  INDIGO: "ba9edd",
  GRAY: "d7d7d7",
};

const SwipeActionList: React.FC<any> = ({ sized, isSortedByColor }: any) => {
  const [add, setAdd] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [simpleAdd, setSimpleAdd] = useState(false);
  const [modal, setModal] = useState(false);
  const [click, setClick] = useState(false);
  const [items, setItems] = useState<TodoItem[]>([]);
  const [modalId, setModalId] = useState(0);
  const [modal3, setModal3] = useState(false);

  const [scrollbarOpacity, setScrollbarOpacity] = useState<number>(0);
  const scrollTimerRef = useRef<number | null>(null);
  const fadeAnimationRef = useRef<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedDate = useStore((state) => state.selectedDate);

  const formatDateToYYYYMMDD = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}${month}${day}`;
  };

  const getData = async () => {
    const res = await instance.get("/user");

    const formattedDate = formatDateToYYYYMMDD(selectedDate as Date);

    const getDateInfo = await instance.get(
      `/todolist/${res.data.userId}/${formattedDate}`
    );

    setItems(
      getDateInfo.data.map((el: any) => {
        return {
          id: el.todoId,
          text: el.todoText,
          color: colorTagToColor[el.colorTag],
          colorTag: el.colorTag,
          time: el.targetTime,
          days: [],
          status: el.status,
          date: formattedDate,
        };
      })
    );
  };

  useEffect(() => {
    getData();
  }, [selectedDate]);

  const [selectedItem, setSelectedItem] = useState<TodoItem | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Handlers
  const handleAddTask = useCallback(() => {
    setSimpleAdd(true);
  }, []);

  const handleEdit = useCallback(
    (id: number) => {
      const itemToEdit = items.find((item) => item.id === id);
      if (itemToEdit) {
        setSelectedItem(itemToEdit);
      }
    },
    [items]
  );

  const handleDelete = async (id: number) => {
    const res = await instance.get("/user");
    const deleteRes = await instance.delete(
      `/todolist/delete/${id}?userId=${res.data.userId}`
    );
    getData();
  };

  const handleDelay = (id: number) => {
    setModal(true);
    setModalId(id);
  };

  const handleSelect = (id: number) => {
    handleEdit(id);
  };

  const handleShowFullAdd = useCallback(() => {
    setSimpleAdd(false);
    setSelectedItem(null);
    setAdd(true);
  }, []);

  const handleCheckboxChange = useCallback(() => {
    setClick((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleSubmit();
        setInputValue("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, selectedDate, inputValue]); // selectedDate를 의존성 배열에 추가

  const handleSubmit = async () => {
    const res = await instance.get("/user");

    await instance.post("/todolist/specific-day", {
      userId: res.data.userId,
      todoText: inputValue,
      colorTag: "GRAY",
      targetTime: "10:00",
      targetDate: parseInt(formatDateToYYYYMMDD(selectedDate as Date)),
    });

    setSimpleAdd(false);
    setAdd(false);
    getData();
  };

  const fadeOutScrollbar = useCallback(() => {
    let opacity = 0.3;
    const fadeOut = () => {
      opacity -= 0.01;
      setScrollbarOpacity(opacity);
      if (opacity > 0) {
        fadeAnimationRef.current = requestAnimationFrame(fadeOut);
      }
    };
    fadeAnimationRef.current = requestAnimationFrame(fadeOut);
  }, []);

  const handleScroll = useCallback(() => {
    setScrollbarOpacity(0.3);
    if (scrollTimerRef.current !== null) {
      clearTimeout(scrollTimerRef.current);
    }
    if (fadeAnimationRef.current !== null) {
      cancelAnimationFrame(fadeAnimationRef.current);
    }
    scrollTimerRef.current = window.setTimeout(() => {
      fadeOutScrollbar();
    }, 1000);
  }, [fadeOutScrollbar]);

  useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener("scroll", handleScroll);
      }
      if (scrollTimerRef.current !== null) {
        clearTimeout(scrollTimerRef.current);
      }
      if (fadeAnimationRef.current !== null) {
        cancelAnimationFrame(fadeAnimationRef.current);
      }
    };
  }, [handleScroll]);

  const getSortedItems = useCallback(() => {
    if (!isSortedByColor) return items;

    return [...items].sort((a, b) => {
      if (a.color < b.color) return -1;
      if (a.color > b.color) return 1;
      return 0;
    });
  }, [items, isSortedByColor]);

  return (
    <>
      {!add && !simpleAdd && (
        <button
          onClick={handleAddTask}
          className="w-[350px] h-[50px] p-2 mt-2 text-gray-500 border border-gray-200 rounded-lg text-center shadow-sm flex  items-center bg-white text-[12px] pl-[15px]"
        >
          + 할 일 추가
        </button>
      )}

      {simpleAdd && (
        <div ref={ref} className="flex">
          <div
            className={`min-w-[5px] mt-2 bg-[#d7d7d7] h-[50px] rounded-tl-lg rounded-bl-lg `}
          ></div>
          <div className="w-[343px] max-xs:w-full h-[50px] p-2 mt-2 bg-[#FFFFFF] text-gray-500 border border-gray-200 rounded-tr-lg  rounded-br-lg text-center shadow-sm flex items-center justify-center">
            <div className="flex mb-[20px] ">
              <div className="relative w-[10px]">
                <input
                  type="checkbox"
                  className="absolute z-[1] top-[15px] opacity-0"
                  onChange={handleCheckboxChange}
                />
                {click ? (
                  <svg
                    className="absolute z-[0] top-[15px] cursor-pointer"
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
                    className="absolute z-[0] top-[15px] cursor-pointer"
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
              <input
                className="border-b border-[#a5a5a5] w-[249px] mr-[8px] focus:outline-none ml-[20px] mt-[10px] pl-[5px]"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <button
              onClick={handleShowFullAdd}
              className="text-2xl font-bold mb-[5px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M15.5 8L15.5 22L14.5 22L14.5 8L15.5 8Z"
                  fill="#3F3F3F"
                />
                <path d="M8 14H22V15H8V14Z" fill="#3F3F3F" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {add && (
        <TodoAdd
          initialInputValue={inputValue}
          setInitialInputValue={setInputValue}
          setAdd={setAdd}
          initialData={selectedItem}
          val={inputValue}
          getData={getData}
          setModal3={setModal3}
        />
      )}

      <div
        ref={listRef}
        className={`w-[380px] max-xs:w-full p-4 rounded-lg shadow-lg overflow-y-auto overflow-x-hidden scroll-container ${
          sized ? "h-[464px]" : "h-[185px]"
        }`}
      >
        <style jsx>{`
          .scroll-container::-webkit-scrollbar {
            width: 10px;
          }
          .scroll-container::-webkit-scrollbar-track {
            background: transparent;
          }
          .scroll-container::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, ${scrollbarOpacity});
            border-radius: 20px;
            border: 3px solid transparent;
            background-clip: content-box;
          }
          .scrollbar {
            width: 200px;
            height: 200px;
            overflow: overlay;
            border: 1px solid #ddd;
          }
        `}</style>
        <ul className="bg-gray-100 rounded-lg overflow-hidden min-w-[350px] ">
          {getSortedItems().map((item) => (
            <div key={item.id}>
              <ListItem
                setModal3={setModal3}
                item={item}
                id={item.id}
                text={item.text}
                color={item.color}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDelay={handleDelay}
                onSelect={handleSelect}
                getData={getData}
              />
            </div>
          ))}
        </ul>
      </div>

      {modal && (
        <Modal
          setModal={setModal}
          text=""
          items={items}
          id={modalId}
          getData={getData}
        />
      )}
      {modal3 && (
        <Modal
          id={0}
          items={[]}
          getData={() => {}}
          tutorial={true}
          setModal={setModal3}
          text={`할 일을 전부 완료했어요!
보너스 코인을 드릴게요.`}
        />
      )}
    </>
  );
};

export default React.memo(SwipeActionList);
