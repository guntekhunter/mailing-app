import React, { useState } from "react";
import TextColor from "../Text/TextColor";
import Action from "../Buttons/Action";
import { HiChevronDown } from "react-icons/hi";
import Text from "../Text/TextColor";
import { addTujuan } from "../../../Fetch/Fetch";

export default function Drop({
  onChange,
  callback,
  name,
  drop,
  className,
  item,
  value,
  type,
  tujuanCallback,
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
  const [isShow, setIsShow] = useState(false);
  const [tujuan, setTujuan] = useState({ tujuan_name: "" });
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);

  const handleOpenCreateDropDown = () => {
    setIsCreateMenuOpen(!isCreateMenuOpen);
    setOpen(!open);
  };

  const handleClick = (name) => {
    if (name !== selected) {
      setSelected(name);
      setOpen(false);
      callback(name);
    }
  };

  const showInput = () => {
    setOpen(true);
    setIsShow(true);
  };

  const addingTujuan = async () => {
    await addTujuan(tujuan);
    tujuanCallback(true);
    setOpen(false);
    setIsShow(false);
  };

  const handleOnChange = (e) => {
    setTujuan((prev) => {
      return { ...prev, tujuan_name: e.target.value };
    });
  };

  return (
    <button
      onChange={onChange}
      name={name}
      onClick={handleOpenCreateDropDown}
      className={`group relative flex ${className} ${buttonClassName} w-full h-fit rounded-[6px] h-[2rem] border-[1.5px] text-[.8rem] px-1.5 py-1 relative`}
    >
      <TextColor item={selected ? selected : item} color="lightDark" />
      {open ? <ArrowUp /> : <ArrowDown />}
      <div
        className={`absolute top-full mt-1 z-10 right-[.01rem] w-max min-w-full rounded bg-[#FFFFFF] ${
          open ? "group-focus:block" : "hidden"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="rounded border-[1.5px] text-left h-32 overflow-y-scroll rounded border text-left scrollbar-thin scrollbar-track-[#FFFFFF] scrollbar-thumb-[#1561D5]">
          {drop?.map((name) => (
            <li
              key={name.key}
              value={name?.name}
              className={`border-b px-4 py-1 hover:bg-gray-100 ${
                name?.name === selected ? "bg-gray-200" : ""
              }`}
              onClick={() => handleClick(name?.name)}
            >
              <TextColor item={name?.name} color="secondary" />
            </li>
          ))}
          <input
            name={name}
            onChange={handleOnChange}
            className={`w-full outline-none px-4 py-1 border-1 border-grey-500 text-[12px] sticky bottom-0 ${
              isShow ? "" : "hidden"
            }`}
            placeholder="Tambahkan daftar rincian..."
            onKeyDown={(event) => {
              event.key === "Enter" && addingTujuan();
            }}
          />
          <li className="border-b px-4 py-1 hover:bg-gray-100 text-[#3267E3] sticky bottom-0 bg-white">
            <Text
              item="Tambah persuratan..."
              onClick={showInput}
              className={`${isShow && "hidden"}`}
            />
          </li>
        </ul>
      </div>
    </button>
  );

  // ...
}

const ArrowUp = () => {
  return (
    <HiChevronDown
      style={{ transform: "rotate(180deg)" }}
      className="absolute right-0 mr-2 mt-1 text-[]"
    />
  );
};

const ArrowDown = () => {
  return <HiChevronDown className="absolute right-0 mr-2 mt-1 text-[]" />;
};
