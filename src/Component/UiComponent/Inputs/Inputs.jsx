import React from "react";

export default function Inputs({
  onChange,
  itype,
  Ticon,
  className,
  type,
  name,
  value,
  empty,
  ...props
}) {
  const INPUT_TYPE = {
    primary:
      "focus:outline-none focus:border-[#1975FF] focus:ring-sky-[#BBCCF6] focus:ring-2 focus:border-[.9px] px-1",
    secondary:
      "focus:outline-none focus:border-[#1975FF] focus:ring-sky-[#BBCCF6] focus:ring-2 focus:border-[.9px] px-1 bg-[#F1F1F1]",
    error: "outline-none border-[#CB3A31] border-[1.5 px] px-1 pr-3 pr-8 ",
  };
  const buttonClassName = INPUT_TYPE[itype];
  // console.log(name);
  return (
    <div
      className={`${className} relative flex items-center text-[#333333] relative`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`w-4 h-4 absolute ml-3 right-0 mr-2 text-[#CB3A31] ${Ticon}`}
      >
        <path
          fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clip-rule="evenodd"
        />
      </svg>

      <input
        required
        value={value}
        onChange={onChange}
        name={name}
        type={`${type} || text`}
        className={`${buttonClassName} w-full h-fit rounded-[6px] h-[2rem] border-[1.5px] text-[.8rem] px-1.5 py-1 pl-2`}
      />
    </div>
  );
}
