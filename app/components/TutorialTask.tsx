/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useCallback, useEffect } from "react";
import TodoAdd from "./TodoAdd";
import Modal from "./Modal";

const ListItem = ({ item, currentStep }: any) => {
  return (
    <div
      className={`relative flex mb-[10px] ${
        currentStep === 18 ? "z-[180] bg-white" : ""
      }`}
    >
      <div className={`w-[5px] bg-[#ff9b99]`}></div>
      <div className="flex items-center p-4 transition-transform duration-300 ease-out">
        <div className="relative">
          <svg
            className="absolute z-[-1] bottom-[-8px] left-[-5px]"
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
        <span className="pl-[15px]">{item.text}</span>
      </div>
    </div>
  );
};

const TutorialTask = ({ currentStep }: any) => {
  const [add, setAdd] = useState(false);
  const [simpleAdd, setSimpleAdd] = useState(currentStep === 16 ? true : false);
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

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (currentStep === 16) {
      setSimpleAdd(true);
    }
    if (currentStep === 17) {
      setSimpleAdd(false);
      setAdd(true);
    }

    if (currentStep === 18) {
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
              <input
                className="border-b border-[#a5a5a5] w-[269px] mr-[8px] focus:outline-none ml-[20px]"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <span className="text-[30px] h-[30px]">+</span>
            </div>
          </div>
        </div>
      )}

      {add && (
        <div className={`${currentStep === 17 ? "z-[180]" : ""}`}>
          <TodoAdd
            setAdd={setAdd}
            onAddTodo={handleAddTodo}
            initialData={selectedItem}
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
      {modal && <Modal setModal={setModal} />}
    </>
  );
};

export default TutorialTask;
