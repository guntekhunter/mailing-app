import React from "react";
import Text from "./TextColor";
import IconSurat from "../../Assets/Icon/Icon.svg";
import IconTime from "../../Assets/Icon/Time.svg";
import { Link } from "react-router-dom";

export default function sideLink({item, type, ...props}) {
    const SIDE_ITEM = {
        active: "text-[#FFFFFF] bg-[#1975FF]",
        none: "text-[#333333]",

    }
    const textClassName = SIDE_ITEM[type];
  return (
    <li className={`rounded-[6px] ${textClassName}`}>
      <Link href="#" className="flex items-center p-3 space-x-3 rounded-md">
        <img src={item === "Persuratan" ? IconSurat : IconTime} alt="" className={`w-1/12`} />
        <Text item={item} color="primary" className={`${textClassName}`}/>
      </Link>
    </li>
  );
}
