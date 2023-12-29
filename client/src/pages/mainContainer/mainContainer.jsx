import "./mainContainer.css";
import React from "react";
import LeftSideNav from "../leftSideNav/LeftSideNav";
import UserComponent from "../UserComponent/UserComponent";
import FriendsComponent from "../FriendsComponent/FriendsComponent";
import ImagesComponent from "../ImagesComponent/ImagesComponent";
import VideosComponent from "../VideosComponent/VideosComponent";
import MessagesComponent from "../MessagesComponent/MessagesComponent";
import HobbyComponent from "../HobbyComponent/HobbyComponent";

const MainContainer = () => {
  return (
    <div className="userTop">
      <div className="left">
        {/* <LeftSideNav /> */}
      </div>
      <div className="mid">
        {/* <UserComponent/> */}
        {/* <ImagesComponent /> */}
        {/* <VideosComponent /> */}
        {/* <FriendsComponent/> */}
        {/* <MessagesComponent /> */}
        {/* <HobbyComponent /> */}

        {/* im confused. outlet is gonna go here? like this??  - Graham
        <Outlet/> */}
      </div>
      <div className="right"></div>
    </div>
  );
};

export default MainContainer;
