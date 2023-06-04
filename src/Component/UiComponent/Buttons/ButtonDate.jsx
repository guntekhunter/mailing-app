import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { MdKeyboardArrowDown } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import { data } from "autoprefixer";

export default function ButtonDate({ name, onChange, type, value }) {
  const INPUT_TYPE = {
    primary:
      "focus:outline-none focus:border-[#1975FF] focus:ring-sky-[#BBCCF6] focus:ring-2 focus:border-[.9px] px-1",
    secondary:
      "focus:outline-none focus:border-[#1975FF] focus:ring-sky-[#BBCCF6] focus:ring-2 focus:border-[.9px] px-1 bg-[#F1F1F1]",
    error: "outline-none border-[#CB3A31] border-[1.5 px] px-1 pr-3 pr-8 ",
  };
  const buttonClassName = INPUT_TYPE[type];
  // console.log(onChangeDate);
  const [selectedDate, setSelectedDate] = useState(null);
  const selectedData = (date) => {
    setSelectedDate(date);
    onChange(date, name);
  };

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
    }
  }, [value]);
  return (
    <div>
      <DatePicker
        onChange={selectedData}
        name={name}
        selected={selectedDate || (value && new Date(value))}
        formatDate="dd/MM/yyyy"
        className={`${buttonClassName} w-full h-fit rounded-[6px] h-[2rem] border-[1.5px] text-[.8rem] px-1.5 py-1 focus:outline-none focus:border-[#1975FF] focus:ring-sky-[#BBCCF6] focus:ring-2 focus:border-[.9px] px-3`}
      />
      <div className="">
        <MdKeyboardArrowDown className="absolute right-[.4rem] top-[2rem]" />
      </div>
    </div>
  );
}
