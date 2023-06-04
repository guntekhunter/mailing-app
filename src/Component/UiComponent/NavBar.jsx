import React from "react";
import Logo from "../../Assets/Logo Upana.png";
import { Link } from "react-router-dom";
// icons
import { HiOutlineDocumentText } from "react-icons/hi";
import { BiTimeFive } from "react-icons/bi";
import ButtonUser from "./Buttons/ButtonUser";
import Text from "./Text/TextColor";

export default function NavBar({ type, pageName, children, to, ...props }) {
  const menu = [
    { name: "Persuratan", icon: <HiOutlineDocumentText /> },
    { name: "Riwayat", icon: <BiTimeFive /> },
  ];
  return (
    <div className="bg-[#F0F6FF]">
      <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-[#FFFFFF] text-gray-500 hover:text-gray-700 focus:text-gray-700 border-solid border-b-[1px] border-[#E6E6E6]">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between">
          <div className="container-fluid mt-[-1rem]">
            <img className="pt-5 pl-6 w-[8rem]" src={Logo} />
          </div>
          <ButtonUser name={[{ name: "Logout" }]} />
        </div>
      </nav>

      {/* sidebar */}
      <div className="flex bg-[#FFFFFF]">
        <div className="flex flex-col h-screen p-3 w-60">
          <div className="">
            <div className="flex-1">
              <ul className="pt-4 ml-3 text-sm">
                {menu.map((val, index) => {
                  return (
                    <li
                      key={index}
                      className={`${
                        pageName === val.name &&
                        "bg-[#1975FF] rounded-[6px] rounded-md text-[#FFFFFF]"
                      } ${pageName !== val.name && "text-[#333333]"}`}
                    >
                      <Link className="flex flex-row item-center p-2" to={to}>
                        <div className="mr-3 grid place-content-around">
                          {val.icon}
                        </div>
                        <Text
                          color={`${
                            pageName === val.name ? "white" : "primary"
                          }`}
                          item={val.name}
                          className={`${
                            pageName === val.name && "text-[#FFFFFF]"
                          }`}
                        ></Text>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-[#F7F7F7] w-full h-full">{children}</div>
      </div>
    </div>
  );
}
