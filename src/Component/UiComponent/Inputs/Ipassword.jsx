import React, { useState } from "react";
import SearchIcon from "@heroicons/react/outline";

export default function Ipassword({ onChange }) {
  const [isShow, setIsShow] = useState(false);
  const hide = () => {
    setIsShow(!isShow);
    console.log("clicked");
  };
  return (
    <div className="relative flex items-center text-gray-400 relative">
      <svg
        onClick={hide}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 absolute ml-3 right-0 mr-2"
      >
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path
          fill-rule="evenodd"
          d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
          clip-rule="evenodd"
        />
      </svg>
      <input
        type={`${isShow ? "text" : "password"}`}
        onChange={onChange}
        className={`pr-3 pr-8 focus:outline-none focus:border-[#1975FF] focus:ring-sky-[#BBCCF6] focus:ring-1 focus:border-[.9px] px-1 w-full h-fit rounded-[6px] h-[2rem] border-[1.5px] text-[.8rem] px-1.5 py-1`}
      />
    </div>
  );
}
