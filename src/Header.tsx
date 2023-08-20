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
      <div className="flex gap-2 items-center">
        {[
          { page: "Home", url: "/" },
          { page: "About", url: "/about" },
        ].map((link) => (
          <a
            key={link.url}
            href={link.url}
            className="text-grey-800 p-2 m-2 uppercase"
          >
            {link.page}
          </a>
        ))}
      </div>
      <div className="ml-auto mr-auto text-2xl text-center font-bold">
        {props.title}
      </div>
    </div>
  );
};
