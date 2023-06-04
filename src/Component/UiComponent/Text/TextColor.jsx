import React from "react";

export default function TextColor({
  onChange,
  name,
  color,
  item,
  className,
  onClick,
  star,
  ...props
}) {
  const TEXT_COLOR = {
    primary: "text-[#333333] font-bold",
    secondary: "text-[#B2B2B2]",
    white: "text-[#FFFFFF] font-bold",
    lightDark: "text-[#666666]",
    dark: "text-[#333333]",
    header: "text-[#1975FF] text-[20px] font-semibold",
    headerB: "text-[#333333] text-[20px] font-semibold",
    error: "font-bold text-[#CB3A31]",
    errorLight: "text-[#CB3A31]",
  };
  const textClassName = TEXT_COLOR[color];
  return (
    <div
      className={`${textClassName} ${className} text-[12px] tracking-tight flex`}
      onClick={onClick}
    >
      {item}
      {star === "on" ? (
        <p className="text-[#CB3A31] ml-1">*</p>
      ) : (
        <p className="hidden"></p>
      )}
    </div>
  );
}
