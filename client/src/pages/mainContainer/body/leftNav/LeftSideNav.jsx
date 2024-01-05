import "./LeftSideNav.css";
import React, { useState } from "react";
import { Link } from 'react-router-dom'

import { BsGlobeAmericas } from "react-icons/bs";

import { connect } from "react-redux";

const LeftSideNav = ({ profile }) => {

  return (
    <>
      <div className="leftnavcontainer">
        {/* <h3 className='leftsidenavh3'>Feeds</h3> */}
        <h5 className='leftsidenavh5' >Current View : </h5>
        <div >
          {/* <Link to={`/profile/${authedUser._id}`}></Link> */}
          <Link
            to={`/feed/`}
          // className={leftNav.mainFeed === "User" ? "focusedOption" : null}
          >
            <BsGlobeAmericas title="Feeds" /> 

          </Link>

        </div>
        
        <div>

          <Link
            to={`/images/`}
          // className={leftNav.mainFeed === "Images" ? "focusedOption" : null}
          >
            Images
          </Link>
        </div>


        <div>

          <Link
            to={`/videos/`}
          // className={leftNav.mainFeed === "Videos" ? "focusedOption" : null}
          >
            Videos
          </Link>
        </div>

        <div>

          <Link
            to={`/friends/`}
          // className={leftNav.mainFeed === "friends" ? "focusedOption" : null}
          >
            friends
          </Link>
        </div>

      
        <div>

          <Link
            to={`/messages/`}
          // className={leftNav.mainFeed === "Messages" ? "focusedOption" : null}
          >
            Messges
          </Link>
        </div>

        <div>
          <Link
            to={`/hobby/`}
          // className={leftNav.mainFeed === "Hobby" ? "focusedOption" : null}
          >
            Hobby
          </Link>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.auth
  }
}

export default connect(mapStateToProps, null)(LeftSideNav);
