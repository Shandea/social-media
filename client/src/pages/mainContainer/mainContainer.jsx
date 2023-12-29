import "./mainContainer.css";
import React from "react";
import LeftSideNav from "../leftSideNav/LeftSideNav";

const MainContainer = () => {
  return (
    <div className="userTop">
      <div className="left">
        <LeftSideNav />
      </div>
      <div className="mid"></div>
      <div className="right"></div>
    </div>
  );
};

export default MainContainer;
