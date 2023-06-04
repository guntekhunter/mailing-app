import React from "react";
import Text from "../Text/TextColor";

export default function RequiredModal({ message, isOpen }) {
  console.log(isOpen);
  return (
    <div
      className={`bg-[#FFFFFF] mb-5 rounded-[12px] p-6 relative border-[1.5px] border-red-200 bg-red-100/75 flex ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="flex"></div>
      <Text item={`error : ${message}`} color="error" />
    </div>
  );
}
