import React from "react";
import { Link } from "react-router-dom";

export default function Action({ item, className, to, ...props }) {
  return (
    <Link to={`${to}`}>
      <a href="" className={`${className} text-[#1975FF]`}>
        {item}
      </a>
    </Link>
  );
}
