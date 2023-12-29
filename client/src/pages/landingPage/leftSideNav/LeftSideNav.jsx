import "./LeftSideNav.css";
import React, { useState } from "react";

const LeftSideNav = () => {
  const [leftNav, setLeftNav] = useState({
    mainFeed: "User",
  });
  const feedClick = (e) => {
    // console.log("click");
    // console.log(e.target.getAttribute('value'))
    setLeftNav((prev) => ({
      ...prev,
      mainFeed: e.target.getAttribute('value'),
    }));
    console.log(leftNav.mainFeed);
  };
  return (
    <>
      <div className="leftnavcontainer">
        <h3>Feeds</h3>
        <h5>Current View : {leftNav.mainFeed}</h5>
        <p 
        name="user" 
        value="User" 
        onClick={(e) => feedClick(e)}
        className={leftNav.mainFeed === "User" ? "focusedOption" : null}>
          Me
        </p>
        <p 
        name="images" 
        value="Images" 
        onClick={(e) => feedClick(e)}
        className={leftNav.mainFeed === "Images" ? "focusedOption" : null}>
          Images
        </p>
        <p 
        name="videos" 
        value="Videos" 
        onClick={(e) => feedClick(e)}
        className={leftNav.mainFeed === "Videos" ? "focusedOption" : null}>
          Videos
        </p>
        <p 
        name="friends" 
        value="Friends" 
        onClick={(e) => feedClick(e)}
        className={leftNav.mainFeed === "Friends" ? "focusedOption" : null}
        >
          Friends
        </p>
        <p 
        name="messages"
         value="Messages"
          onClick={(e) => feedClick(e)}
          className={leftNav.mainFeed === "Messages" ? "focusedOption" : null}>
          Messages
        </p>
        <p 
        name="hobby" 
        value="Hobby"
         onClick={(e) => feedClick(e)}
         className={leftNav.mainFeed === "Hobby" ? "focusedOption" : null}>
          Hobby
        </p>
        {/* <p>{leftNav.mainFeed}</p> */}
      </div>
    </>
  );
};

export default LeftSideNav;
