import React from "react";
import logo from "./logo.svg";
import { ActiveLink, navigate } from "raviger";

export const Header = (props: { title: string }) => {
  return (
    <div className="flex gap-2 items-center mt-2 mb-2 border-b-2 border-gray-200">
      <img
        src={logo}
        className="animate-spin h-16 w-16 cursor-pointer"
        alt="logo"
        style={{ animation: "spin 2s linear infinite" }}
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="flex gap-2 items-center">
        {[
          { page: "Home", url: "/" },
          { page: "About", url: "/about" },
          { page: "Login", url: "/login" },
        ].map((link) => (
          <ActiveLink
            key={link.url}
            href={link.url}
            className="text-grey-800 p-2 m-2 uppercase"
            exactActiveClass="blue-500 border-b-2 border-blue-500"
          >
            {link.page}
          </ActiveLink>
        ))}
      </div>
      <div className="ml-auto mr-auto text-xl text-center font-bold">
        {props.title}
      </div>
    </div>
  );
};
