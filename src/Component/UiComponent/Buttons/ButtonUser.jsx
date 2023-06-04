import React, { useEffect, useState } from "react";
import UserDefault from "../../../Assets/default.png";
import { BiChevronDown } from "react-icons/bi";
import { HiChevronDown } from "react-icons/hi";
import { Link } from "react-router-dom";
import { getAllUser } from "../../../Fetch/Fetch";

export default function ButtonUser({ name, item }) {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [userAllData, setUserAllData] = useState([]);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);

  const handleOpenCreateDropDown = () => {
    setIsCreateMenuOpen(!isCreateMenuOpen);
    setOpen(!open);
  };

  console.log(localStorage.getItem("user"));
  const user = localStorage.getItem("user");

  const fetchUser = async () => {
    try {
      const res = await getAllUser();
      setUserAllData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  const filteredUsers = userAllData.filter((item) => item.email === user);
  console.log(filteredUsers);

  let userName;
  if (filteredUsers.length > 0) {
    userName = filteredUsers[0].user_name;
    console.log(userName);
  }
  // const userName = filteredUsers[0].user_name;
  // console.log(userAllData);
  return (
    <button
      className="flex w-[3rem] mx-11 gap-1"
      onClick={handleOpenCreateDropDown}
    >
      <img src={UserDefault} alt="" className="rounded-full" />
      <div className="flex place-content-around py-[7px]">
        <BiChevronDown size={25} />
      </div>
      {open ? <ArrowUp /> : <ArrowDown />}
      <div
        className={`absolute top-full mt-1 right-4 z-10 rounded bg-[#FFFFFF] text-[#666666] ${
          open ? "group-focus:block" : "hidden"
        }`}
      >
        <ul className="rounded border text-left">
          {name.map((item, key) => (
            <Link to="/" key={key}>
              <li className="border-b px-4 py-1">{userName}</li>
              <li
                key={key}
                className="border-b px-4 py-1 hover:bg-gray-100"
                onClick={() => {
                  if (item?.name !== selected) {
                    setSelected(item?.name);
                    setOpen(false);
                    localStorage.removeItem("token");
                  }
                }}
              >
                {item?.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </button>
  );
}

const ArrowUp = () => {
  return <HiChevronDown style={{ transform: "rotate(180deg)" }} />;
};

const ArrowDown = () => {
  return <HiChevronDown />;
};
