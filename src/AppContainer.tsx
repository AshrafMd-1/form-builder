import React from "react";
import { Header } from "./Header";

export const AppContainer = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex h-100 min-h-screen bg-gray-100 items-center">
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl sm:w-9/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
        <Header title="Welcome to #react-typescript with #tailwindcss" />
        {props.children}
      </div>
    </div>
  );
};
