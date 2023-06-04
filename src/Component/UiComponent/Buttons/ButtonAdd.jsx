import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Text from "../Text/TextColor";

export default function ButtonAdd({ className, item, onClick, ...props }) {
  return (
    <div>
      <button
        className={`${className} bg-[#F0F6FF] hover:bg-[#F0F6F1] text-[#1975FF] border-none rounded-[6px] border-1 font-normal w-full h-[2rem] `}
        onClick={onClick}
      >
        <div className="flex px-1.5 py-1.5 place-content-around">
          <div className="flex gap-1.5">
            <AiOutlinePlus className="w-4" />
            <Text item={`${item}`} className="font-medium" />
          </div>
        </div>
      </button>
    </div>
  );
}
