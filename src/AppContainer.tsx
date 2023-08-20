import React from "react";
import { Header } from "./Header";

export const AppContainer = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex h-100 min-h-screen bg-gray-100 items-center">
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl  md:w-10/12 lg:w-8/12 xl:w-8/12">
        <Header title="Welcome to #react-typescript with #tailwindcss" />
        {props.children}
      </div>
    </div>
  );
};
