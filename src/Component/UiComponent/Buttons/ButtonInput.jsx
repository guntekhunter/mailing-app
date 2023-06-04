import React, { useRef } from "react";
import Text from "../Text/TextColor";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useState } from "react";

export default function ButtonInput({
  className,
  onClick,
  item,
  listi,
  name,
  onKeyPress,
  callback,
  ...props
}) {
  const [list, setList] = useState(item);
  const [dragging, setDraging] = useState(false);
  const [wipe, setWipe] = useState(false);
  const [listnya, setListnya] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const handleDelete = () => {
    console.log("hapus");
    setListnya(false);
    console.log(listnya);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    const value = e.target.value;
    console.log(value);
    callback(value);
    setInputValue(e.target.value);
  };

  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    console.log("drag starting..", params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDraging(true);
    }, 0);
  };

  const handleDragEnter = (e, params) => {
    console.log(`Entering drag... ${params}`);
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      console.log("TARGET IS NOT THE SAME", params.item);
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        // newList[params.item].params.item.splice(
        //   params.item,
        //   0,
        //   newList[currentItem.item].params.item.spice(currentItem.item, 1)[0]
        // );
        dragItem.current = params;
        return newList;
      });
    }
  };

  const handleDragEnd = () => {
    console.log("Ending drag..");
    setDraging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyle = (params) => {
    const currentItem = dragItem.current;
    if (currentItem.item === params.item) {
      return "bg-current w-full h-fit rounded-[6px] border-none text-[.8rem] hidden";
    }
    return "bg-[#FFFFF] w-full h-fit rounded-[6px] border-none text-[.8rem]";
  };

  const handleEnter = () => {
    setInputValue("");
  };
  console.log(inputValue);
  return (
    <div className={`${listnya === false ? "hidden" : "block"}`}>
      <button
        onKeyPress={onKeyPress}
        onClick={onClick}
        draggable
        onDragStart={(e) => {
          handleDragStart(e, item);
        }}
        onDragEnter={
          dragging
            ? (e) => {
                handleDragEnter(e, item);
              }
            : null
        }
        className={
          dragging
            ? getStyle(item)
            : `${className} bg-[#FFFFFF] w-full h-fit rounded-[6px] border-[1.5px] text-[.8rem]}`
        }
      >
        <div className="flex py-1.5 px-3">
          <div className="flex gap-1.5 justify-between w-full">
            <input
              onKeyPress={(event) => {
                event.key === "Enter" && handleEnter();
              }}
              value={inputValue}
              onChange={handleChange}
              name={name}
              className="w-full outline-none text-[.8rem]"
              placeholder="Tambahkan daftar rincian..."
            />
            <RiDeleteBin6Fill
              className="mt-[.2rem]"
              color="#CB3A31"
              size={".8rem"}
              onClick={listi}
            />
          </div>
        </div>
      </button>
    </div>
  );
}
