import React from "react";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { AiFillPrinter } from "react-icons/ai";
import Text from "../Text/TextColor";

export default function ButtonP({ className, onClick, item, icon, ...props }) {
  return (
    <div className="flex relative">
      <button
        className={`${className} text-[12px] border-[#E6E6E6] rounded-[6px] border-[1.3px] font-normal w-full h-[2rem] px-3 py-1`}
        onClick={onClick}
      >
        <div className="flex py-[3px]">
          <div className="flex gap-2">
            {icon === "simpan" ? (
              // <IoSave/>
              <HiClipboardDocumentList size={16}/>
            ) : (
              <AiFillPrinter size={16}/>
            )}
            <Text item={`${item}`} className="font-medium inline-block align-middle" />
          </div>
        </div>

      </button>
    </div>
  );
}
