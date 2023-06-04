import React, { useRef } from "react";
import Text from "../Text/TextColor";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useState } from "react";

export default function ButtonDrag({ className, onClick, item, ...props }) {
  const [list, setList] = useState(item);
  const [dragging, setDraging] = useState(false);

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
    // console.log(`Entering drag... ${params}`);
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      // console.log("TARGET IS NOT THE SAME", params.item);
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.item].params.item.splice(
          params.item,
          0,
          newList[currentItem.item].params.item.splice(currentItem.item, 1)[0]
        );
        dragItem.current = params;
        return newList;
      });
    }
  };

  const handleDragEnd = () => {
    // console.log("Ending drag..");
    setDraging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyle = (params) => {
    const currentItem = dragItem.current;
    if (currentItem === params) {
      return "bg-current w-full h-fit rounded-[6px] border-none text-[.8rem] hidden";
    }
    return "bg-[#FFFFF] w-full h-fit rounded-[6px] border-none text-[.8rem]";
  };
  // console.log(item);
  return (
    <div>
      <button
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
            : `${className} bg-[#FFFFFF] w-full h-fit rounded-[6px] border-[1.5px] text-[.8rem]`
        }
      >
        <div className="flex py-1.5 px-3">
          <div className="flex gap-1.5 justify-between w-full">
            <Text item={item} className="font-medium" />
            <RiDeleteBin6Fill className="mt-[.2rem]" color="#CB3A31" />
          </div>
        </div>
      </button>
    </div>
  );
}
