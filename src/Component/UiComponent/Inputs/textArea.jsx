import React from "react";

export default function textArea({
  onChange,
  name,
  className,
  item,
  type,
  value,
  ...props
}) {
  const INPUT_TYPE = {
    primary:
      "focus:outline-none focus:border-[#1975FF] focus:ring-sky-[#BBCCF6] focus:ring-2 focus:border-[.9px] px-1",
    secondary:
      "focus:outline-none focus:border-[#1975FF] focus:ring-sky-[#BBCCF6] focus:ring-2 focus:border-[.9px] px-1 bg-[#F1F1F1]",
    error: "outline-none border-[#CB3A31] border-[1.5 px] px-1 pr-3 pr-8 ",
  };
  const buttonClassName = INPUT_TYPE[type];
  return (
    <div
      className={`${className} relative flex items-center text-gray-400 relative`}
    >
      <textArea
        onChange={onChange}
        name={name}
        type={`${type} || text`}
        className={` ${buttonClassName} focus:outline-none focus:border-[#1975FF] focus:ring-sky-[#BBCCF6] focus:ring-2 focus:border-[.9px] px-1 w-full h-fit rounded-[6px] h-[2rem] border-[1.5px] text-[.8rem] px-1.5 py-1`}
      >
        {value}
      </textArea>
    </div>
  );
}
