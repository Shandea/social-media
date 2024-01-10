import React, { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import {
  FaCalendarPlus,
  FaCommentDots,
  FaCommentSlash,
  FaCirclePlus,
} from "react-icons/fa6";

import API from "../../../../../config/api/Api";

import FriendStatus from "../../../../../components/friends/friendStatus/FriendStatus";

const ViewProfile = (props) => {
  let nav = useNavigate();
  let fakeimages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let fakegroups = [1, 2, 3, 4, 5, 6];
  let fakehobbys = [1, 2, 3, 4];

let [profileView,setProfileView] = useState({});
let {id} = useParams()
useEffect(()=>{
    API.getViewProfile(id).then(res=>{
        console.log("res data",res)
        
        setProfileView(res)
    })
},[id])



  return (
    <>
     {/* {console.log("img src tag", srcStr)} */}
     {
       
          <div className="outer">
            <div className="profileOuterContainer">
              <div className="" >background banner</div>
              <span className="badge2">
                <img alt="" src={`http://localhost:5000${profileView.profileImg}`} />
              </span>
            </div>

            <div>
              <FriendStatus id={id}/>
            </div>

            <div className="profileScroll">

              <div className="leftScroll">

                <div className="innerLeftScroll">
                  <div className="bios">
                    <h4>bio</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos facilis at labore saepe similique architecto quia id? Veritatis, delectus minus.</p>
                    <button>edit bio</button>
                    <p>education</p>
                    <p>location</p>
                    <p>marital status</p>
                    <button>edit details</button>
                  </div>

                  <div className="photoWall">
                    <h3>photos show here</h3>
                  </div>
                  <div className="friendWall">
                    <h3>friends show here</h3>
                  </div>
                  <div className="hobbyWall">
                    <h3>hobbies show here</h3>
                  </div>
                </div>

              </div>

              <div className="rightScroll">
                <div className="innerRightScroll">
                  <div className="createPostWall">
                    <h3>create a post here</h3>
                  </div>
                  <div className="postWall">
                    <h3>posts show here</h3>
                  </div>
                </div>
              </div>

            </div>

          </div>
      }
    </>
  );
};

export default ViewProfile;