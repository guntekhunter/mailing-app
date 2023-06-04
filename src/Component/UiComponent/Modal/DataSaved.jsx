import React from "react";
import TextColor from "../Text/TextColor";

export default function DataSaved({ info, isActive }) {
  return (
    <div className="aboslute w-full h-full sticky top-0 z-10 duratio-500">
      <div className="w-full">
        <div
          className={`bg-[#1975FF] duration-500 border-[2px] border-[#1975FF] ${
            isActive ? "opacity-80" : "opacity-0"
          } rounded-lg absolute right-0 mt-[1.5rem] mr-[1.5rem] p-[2rem] ${
            isActive ? "transform translate-y-0" : "transform -translate-y-full"
          }`}
        >
          <TextColor item={info} color="white"></TextColor>
        </div>
      </div>
    </div>
  );
}
