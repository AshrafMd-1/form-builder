import React from "react";
import { Header } from "./Header";
import { User } from "./types/userTypes";

export const AppContainer = (props: {
  children: React.ReactNode;
  currentUser: User;
}) => {
  return (
    <div className="flex h-100 min-h-screen bg-gray-100 items-center">
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl sm:w-10/12  md:w-10/12 lg:w-6/12 xl:w-6/12">
        <Header
          title="Welcome to #react-typescript with #tailwindcss"
          currentUser={props.currentUser}
        />
        {props.children}
      </div>
    </div>
  );
};
