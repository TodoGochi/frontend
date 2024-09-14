/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import TodoAdd from "./TodoAdd";

const TaskItem = ({ task }) => {
  return (
    <div className="flex items-center p-2 mb-2  rounded-lg shadow-sm border border-gray-200 relative">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-300 rounded-l-lg"></div>
      <input
        type="checkbox"
        className="form-checkbox text-gray-600 w-5 h-5 mr-2"
      />
      <span className="text-gray-800">{task}</span>
    </div>
  );
};

const TaskList = () => {
  const [tasks, setTasks] = useState(["저녁 메뉴 장보기", "빨래 돌리기"]);
  const [add, setAdd] = useState(false);

  const addTask = () => {
    setAdd(true);
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

        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} />
        ))}

        {!add && (
          <button
            onClick={addTask}
            className="w-full p-2 mt-2 text-gray-500 border border-gray-200 rounded-lg text-center shadow-sm"
          >
            + 할 일 추가
          </button>
        )}
      </div>
      {add && <TodoAdd setAdd={setAdd} />}
    </>
  );
};

export default TaskList;
