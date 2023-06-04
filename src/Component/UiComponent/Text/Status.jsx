import React from "react";

export default function Status({ item, className, ...props }) {
  const STATUS_COLOR = {
    printed: "bg-[#D9E9E2] border-[#C0DBCE] border-[1px] text-[#43936C]",
    draf: "bg-[#F5E5D5] border-[#EED3B9] border-[1px] text-[#CD7B2E]",
  };
  const statusClassName = STATUS_COLOR[item];
  return (
    <p className={`${statusClassName} w-fit rounded-md px-2 py-1`}>{item}</p>
  );
}
