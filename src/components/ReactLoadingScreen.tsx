import React from "react";
import ReactLoading from "react-loading";

export const ReactLoadingScreen = () => {
  const color = [
    "red",
    "blue",
    "green",
    "yellow",
    "black",
    "white",
    "purple",
    "pink",
    "orange",
  ];
  return (
    <div className="flex flex-col justify-center items-center">
      <ReactLoading
        type={"bars"}
        color={color[Math.floor(Math.random() * color.length)]}
        height={"20%"}
        width={"20%"}
      />
    </div>
  );
};
