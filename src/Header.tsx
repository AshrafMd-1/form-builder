import React from "react";
import logo from "./logo.svg";
import { ActiveLink, navigate } from "raviger";
import { User } from "./types/userTypes";

export const Header = (props: { title: string; currentUser: User }) => {
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
          ...(props.currentUser?.username?.length > 0
            ? [
                {
                  page: "Logout",
                  onClick: () => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  },
                },
              ]
            : [{ page: "Login", url: "/login" }]),
        ].map((link, id) => (
          <div key={id}>
            {link.url ? (
              <ActiveLink
                key={link.url}
                href={link.url}
                className="text-grey-800 p-2 m-2 uppercase"
                exactActiveClass="blue-500 border-b-2 border-blue-500"
              >
                {link.page}
              </ActiveLink>
            ) : (
              <button
                key={link.url}
                onClick={link.onClick}
                className="text-grey-800 p-2 m-2 uppercase"
              >
                {link.page}
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="ml-auto mr-auto text-xl text-center font-bold">
        {props.title}
      </div>
    </div>
  );
};
