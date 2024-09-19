/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useCallback, useEffect } from "react";
import TodoAdd from "./TodoAdd";
import Modal from "./Modal";

interface TodoItem {
  id: number;
  text: string;
  color: string;
  days: string[];
  time: string;
}

interface ListItemProps {
  id: number;
  text: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDelay: () => void;
  color: string;
  onSelect: (id: number) => void;
}

const ListItem: React.FC<ListItemProps> = ({
  id,
  text,
  onEdit,
  onDelete,
  onDelay,
  color,
  onSelect,
}) => {
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

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging && !isButtonAreaRef.current) {
        onSelect(id);
      }
    },
    [id, isDragging, onSelect]
  );

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
  const handleEditClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      onEdit(id);
    },
    [id, onEdit]
  );

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
      onDelay();
    },
    [onDelay]
  );

  const handleCheckboxChange = useCallback(() => {
    setClick((prev) => !prev);
  }, []);

  console.log(color);

  return (
    <div className="flex mb-[10px]">
      <div className={`w-[5px] bg-[#${color}]`}></div>
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
        onClick={handleClick}
      >
        <div
          className="flex items-center p-4 transition-transform duration-300 ease-out"
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
          className="absolute top-0 right-0 h-full flex transition-transform duration-300 ease-out z-10"
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
          <button onClick={handleDeleteClick}>
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

  const [selectedItem, setSelectedItem] = useState<TodoItem | null>(null);

  // Handlers
  const handleAddTask = useCallback(() => {
    setSelectedItem(null);
    setAdd(true);
  }, []);

  const handleEdit = useCallback(
    (id: number) => {
      console.log("handleEdit called with id:", id);
      const itemToEdit = items.find((item) => item.id === id);
      if (itemToEdit) {
        setSelectedItem(itemToEdit);
        setAdd(true);
      }
    },
    [items]
  );

  const handleDelete = useCallback((id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const handleDelay = useCallback(() => {
    setModal(true);
  }, []);

  const handleAddTodo = useCallback(
    (newTodo: Omit<TodoItem, "id">) => {
      setItems((prevItems) => {
        if (selectedItem) {
          return prevItems.map((item) =>
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

  const handleSelect = useCallback(
    (id: number) => {
      console.log("handleSelect called with id:", id);
      handleEdit(id);
    },
    [handleEdit]
  );

  return (
    <>
      {!add && (
        <button
          onClick={handleAddTask}
          className="w-[350px] h-[50px] p-2 mt-2 text-gray-500 border border-gray-200 rounded-lg text-center shadow-sm"
        >
          + 할 일 추가
        </button>
      )}
      {add && (
        <TodoAdd
          setAdd={setAdd}
          onAddTodo={handleAddTodo}
          initialData={selectedItem}
        />
      )}
      <div className="w-[380px] mx-auto p-4 rounded-lg shadow-lg">
        {/* ... */}
        <ul className="bg-gray-100 rounded-lg overflow-hidden">
          {items.map((item) => (
            <ListItem
              key={item.id}
              id={item.id}
              text={item.text}
              color={item.color}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDelay={handleDelay}
              onSelect={handleSelect}
            />
          ))}
        </ul>
      </div>
      {modal && <Modal setModal={setModal} />}
    </>
  );
};

export default React.memo(SwipeActionList);
