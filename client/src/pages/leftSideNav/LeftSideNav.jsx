import "./LeftSideNav.css";
import React, { useState } from "react";
import { Link } from 'react-router-dom'

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
        <h3 className='leftsidenavh3'>Feeds</h3>
        <h5 className='leftsidenavh5' >Current View : {leftNav.mainFeed}</h5>


        <div >
          {/* <Link to={`/profile/${authedUser._id}`}></Link> */}
          <Link
            to={`/feed/`}
          // className={leftNav.mainFeed === "User" ? "focusedOption" : null}
          >
            Feeds
          </Link>

        </div>
        <div >
          {/* <Link to={`/profile/${authedUser._id}`}></Link> */}
          <Link
            to={`/profile/`}
          // className={leftNav.mainFeed === "User" ? "focusedOption" : null}
          >
            Profile
          </Link>

        </div>

        {/* <p
          name="user"
          value="User"
          onClick={(e) => feedClick(e)}
          className={leftNav.mainFeed === "User" ? "focusedOption" : null}
        >
          Me
        </p> */}

        {/* <p
          name="images"
          value="Images"
          onClick={(e) => feedClick(e)}
          className={leftNav.mainFeed === "Images" ? "focusedOption" : null}>
          Images
        </p> */}
     <div>

          <Link
            to={`/images/`}
            className={leftNav.mainFeed === "Images" ? "focusedOption" : null}
          >
            Images
          </Link>
        </div>


        <div>

        <Link
          to={`/videos/`}
          className={leftNav.mainFeed === "Videos" ? "focusedOption" : null}
        >
          Videos
        </Link>
</div>

        {/* <p
          name="videos"
          value="Videos"
          onClick={(e) => feedClick(e)}
          className={leftNav.mainFeed === "Videos" ? "focusedOption" : null}>
          Videos
        </p> */}

<div>

        <Link
          to={`/friends/`}
          className={leftNav.mainFeed === "friends" ? "focusedOption" : null}
        >
          friends
        </Link>
        </div>

        {/* <p
          name="friends"
          value="Friends"
          onClick={(e) => feedClick(e)}
          className={leftNav.mainFeed === "Friends" ? "focusedOption" : null}
        >
          Friends
        </p> */}
     <div>

        <Link
          to={`/messages/`}
          className={leftNav.mainFeed === "Messages" ? "focusedOption" : null}
        >
          Messges
        </Link>
        </div>


        {/* <p
          name="messages"
          value="Messages"
          onClick={(e) => feedClick(e)}
          className={leftNav.mainFeed === "Messages" ? "focusedOption" : null}>
          Messages
        </p> */}
     <div>

        <Link
          to={`/hobby/`}
          className={leftNav.mainFeed === "Hobby" ? "focusedOption" : null}
        >
          Hobby
        </Link>
        </div>


        {/* <p
          name="hobby"
          value="Hobby"
          onClick={(e) => feedClick(e)}
          className={leftNav.mainFeed === "Hobby" ? "focusedOption" : null}>
          Hobby
        </p> */}
        {/* <p>{leftNav.mainFeed}</p> */}
      </div>
    </>
  );
};

export default LeftSideNav;
