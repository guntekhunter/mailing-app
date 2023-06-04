import React, { Children } from "react";

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={`${className} bg-[#FFFFFF] m-7 rounded-[12px] mb-8 p-6 relative`}
    >
      {children}
    </div>
  );
}
