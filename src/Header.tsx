import React from "react";
import logo from "./logo.svg";

export const Header = (props: { title: string }) => {
  return (
    <div className="flex gap-2 items-center mt-2 mb-2">
      <img
        src={logo}
        className="animate-spin h-16 w-16"
        alt="logo"
        style={{ animation: "spin 2s linear infinite" }}
      />
      <h1 className="ml-3 font-medium text-center text-2xl flex-1">
        {props.title}
      </h1>
    </div>
  );
};
