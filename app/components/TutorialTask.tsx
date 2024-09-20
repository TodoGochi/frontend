/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useCallback, useEffect } from "react";
import TodoAdd from "./TodoAdd";
import Modal from "./Modal";

const ListItem = ({ item }: any) => {
  return (
    <div className="flex mb-[10px]">
      <div className={`w-[5px] bg-[#ff9b99]`}></div>
      <div className="flex items-center p-4 transition-transform duration-300 ease-out">
        <div className="relative">
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
    </div>
  );
};

const TutorialTask = ({ currentStep }: any) => {
  const [add, setAdd] = useState(false);
  const [simpleAdd, setSimpleAdd] = useState(false);
  const [modal, setModal] = useState(false);
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
      color: "ff9b99",
      days: ["월", "수", "금"],
      time: "18:30",
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Handlers
  const handleAddTask = useCallback(() => {
    setSimpleAdd(true);
  }, []);

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

  const handleShowFullAdd = useCallback(() => {
    setSimpleAdd(false);
    setSelectedItem(null);
    setAdd(true);
  }, []);

  return (
    <>
      {!add && !simpleAdd && (
        <button
          onClick={handleAddTask}
          className="w-[350px] h-[50px] p-2 mt-2 text-gray-500 border border-gray-200 rounded-lg text-center shadow-sm"
        >
          + 할 일 추가
        </button>
      )}

      {simpleAdd && (
        <div className="w-[350px] h-[50px] p-2 mt-2 text-gray-500 border border-gray-200 rounded-lg text-center shadow-sm flex items-center justify-center">
          <button onClick={handleShowFullAdd} className="text-2xl font-bold">
            +
          </button>
        </div>
      )}

      {add && (
        <TodoAdd
          setAdd={setAdd}
          onAddTodo={handleAddTodo}
          initialData={selectedItem}
        />
      )}

      <div className="w-[380px] mx-auto p-4 rounded-lg shadow-lg">
        <ul className="bg-gray-100 rounded-lg overflow-hidden">
          {items.map((item: any, index: number) => (
            <ListItem key={index} item={item} />
          ))}
        </ul>
      </div>
      {modal && <Modal setModal={setModal} />}
    </>
  );
};

export default TutorialTask;
