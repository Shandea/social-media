import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./FriendSearch.css";
import { Link } from "react-router-dom";

const FriendSearch = () => {

  let [data, setData] = useState([]);
  let [fieldQuery, setFieldQuery] = useState({ fields: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const initialValue = "defaultSearchTerm";

  const fetchData = (value) => {
    axios({
      method: "get",
      url: `http://localhost:5000/socialConnection/searchFriend?${fieldQuery}=${value}`,
      withCredentials: true,
    }).then((res) => {
      console.log("res", res);
      setData(res.data);
    });
  };
  useEffect(() => {
    fetchData(initialValue);
  }, []);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    fetchData(event.target.value);
  };

  return (
    <>
      {/* {console.log("input change",data)}
        {console.log("input change search query",searchQuery)}
        {console.log("input change search fields",fieldQuery)} */}

      <div className="FSheader">
        <h1>Search Friends</h1>
      </div>

      <form>
        <div className="FSinput">
          <input
            onChange={handleSearchChange}
            placeholder="Search"
            name="search"
            type="text"
            className="fsinput"
          />
          {/* <button>search</button> */}
        </div>
        {/* 
                need check box for fields
                
            */}
        <div className="filterinputs">
          <div className="topthree">


<div className="box">
            <label>All </label>
            <input
              onChange={(e) => setFieldQuery(e.target.value)}
              name="fields"
              type="radio"
              value={"allFields"}
            />
</div>

<div className="box">
            <label>Gender </label>
            <input
              onChange={(e) => setFieldQuery(e.target.value)}
              name="fields"
              type="radio"
              value={"gender"}
            />
</div>
<div className="box">

            <label>Username </label>
            <input
              onChange={(e) => setFieldQuery(e.target.value)}
              name="fields"
              type="radio"
              value={"username"}
            />
            </div>
          </div>

          <div className="bottomthree">

            {" "}
            <div className="box">
            <label>City </label>
            <input
              onChange={(e) => setFieldQuery(e.target.value)}
              name="fields"
              type="radio"
              value={"city"}
            />
            </div>
            <div className="box">
            <label>State </label>
            <input
              onChange={(e) => setFieldQuery(e.target.value)}
              name="fields"
              type="radio"
              value={"state"}
            />
            </div>
            <div className="box">
            <label>Zipcode</label>
            <input
              onChange={(e) => setFieldQuery(e.target.value)}
              name="fields"
              type="radio"
              value={"zipcode"}
            />
            </div>
          </div>
        </div>
      </form>

      <div>
        <h1 style={{margin: "10px"}}>Search results</h1>
        <div className="searchresults">
        {data.map((foundUser, i) => {
          console.log("friend search",foundUser)
          return (
            <Link to={`/profile/${foundUser._id}`}>
            <div key={foundUser._id} className="usercard">
                {/* <div className="conimg"></div> */}
       
                      <div className="conimg" style={{  backgroundImage: `url("http://localhost:5000${foundUser.profileImg}"), url("http://localhost:5000/public/default.jpeg")`}}></div>
                <div  className="ufln">
                    <p className="fl">{`${foundUser.firstName} ${foundUser.lastName}`}</p>
                <p className="un">{foundUser.username}</p>
                
              </div>
              <div className="OL">
                <p>Online</p>
                <div className="OD"></div>
              </div>
            </div>
            </Link>
          );
        })}
        </div>
      </div>
    </>
  );
};

export default FriendSearch;
