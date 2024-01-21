import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import convertDate from "../../util/convertDate";
import { TiDeleteOutline } from "react-icons/ti";
import { getUser } from "../../config/redux/actions/AuthActions";
import store from "../../config/redux/Store";
import truncate from "../../util/truncate";
import "./NotificationLogic.css";

const NotificationLogic = ({ authState }) => {
  const nav = useNavigate();
  const [notifications, setNotifications] = useState(
    authState.userProfile.notifications
  );


  const [contact, setContact] = useState({})

  let [notice, setNotice] = useState([])


  useEffect(() => {
    console.log("usee=Effect", authState.userProfile.notifications);
    setNotifications(authState.userProfile.notifications);


    // notice = authState.userProfile.notifications.map((item, i) => ({ ...item, i }))


  }, []);

  useEffect(() => {
    setNotice(notifications.map((item, i) => ({ ...item, i })))

  }, [notifications])

  const handleDeleteNotice = (e) => {
    console.warn("removing", e.target.id);
    axios({
      method: 'POST',
      withCredentials: true,
      url: 'http://localhost:5000/api/removeNotice',
      data: { index: e.target.id }
    })

      .then(res => {
        console.log("remove res", res.data.notifications)
        setNotifications(res.data.notifications)

      })
      .catch(err => console.log("err", err))
    //   notice = notifications.map((item, i) => ({ ...item, i }))
  };

  // let notice = [];
  let likeCount;
  let commentCount;
  let likes;
  let comments;
  let likesMap;
  let commentMap;
  let masterNot;

  // let test = notifications.map((item, i) => {
  //   console.log("test map", item)
  //   // map everything, then filter keeping I

  //   // return(
  //   // likesMap = item.filter((obj) => {

  //   // }) 
  //   // )
  // })



  if (notifications) {



    // THIS map creates the i reference to delete the notification... so we need to use this to display and render, update stte and reassing to this

    // notice = authState.userProfile.notifications.map((item, i) => ({ ...item, i }))






    likeCount = notifications.filter(
      (obj) => Object.keys(obj) == "like"
    ).length;
    console.log("like count", likeCount);

    commentCount = notifications.filter(
      (obj) => Object.keys(obj) == "comment"
    ).length;
    console.log("comment Count", commentCount);
    //
    likes = notifications.filter((obj) => Object.keys(obj) == "like");
    // console.log("likes", likes)

    comments = notifications.filter((obj) => Object.keys(obj) == "comment");
    console.log("comments", comments);

    // masterNot = notifications.map((item, i ) =>{
    //     comments = notifications.filter((obj) => Object.keys(obj) == "comment")
    //     likes = notifications.filter((obj) => Object.keys(obj) == "like")

    // } )

    likesMap = likes.map((item, i) => {
      return (
        <div key={i}>
          <div className="notificationInfo">
            <div className="contactimgnot"></div>
            <div className="notright">
              <div>
                <div
                  className="notusername"
                  onClick={() => nav("/profile/" + item.like.userId)}
                  style={{ textDecoration: "none", font: "black" }}
                  key={i}
                >
                  {" "}
                  {` ${item.like.user}   `}{" "}
                </div>
              </div>

              <div className="notcontent">
                <p className="liketext">liked your</p>

                <div style={{ marginRight: "10px" }}>
                  <div onClick={() => nav(`/feed/${item.like.ogFeed}#${item.like.likedDoc}`)}
                    className="comment1"
                    style={{ textDecoration: "none", font: "black" }}
                    to={`/feed/${item.like.ogFeed}#${item.like.likedDoc}`}
                  >
                    {" "}
                    comment{" "}
                  </div>
                </div>
              </div>

              <div className="moment">{convertDate(item.like.createdAt)}</div>
            </div>
            <TiDeleteOutline
              className="icon4"
              id={i}
              onClick={(e) => handleDeleteNotice(e)}
            />
          </div>
        </div>
      );
    });

    commentMap = comments.map((item) => {
      console.log("ITEM", item);
      return (
        <div key={item.i}>




          <div className="notificationInfo" style={{ display: "flex" }}>
            {/* <p> */}

            <div style={{ marginRight: "10px" }}>
              <Link
                style={{ textDecoration: "none", font: "black" }}
                key={item.i}
                to={"/profile/" + item.comment.authorId}
              >
                {" "}
                {` ${item.comment.authorName} `}
              </Link>
            </div>
            <div style={{ marginRight: "10px" }}>
              <p>said </p>
            </div>
            <div style={{ marginRight: "10px" }}>
              '{truncate(item.comment.comment)}'
            </div>

            <Link
              style={{ marginRight: "10px" }}
              to={`/feed/${item.comment.ogFeed}#${item.comment.parentDoc}`}
            >
              {" "}
              about post
            </Link>

            <div style={{ marginRight: "10px" }}>
              {convertDate(item.comment.createdAt)}
            </div>

            <TiDeleteOutline
              style={{ float: "right" }}
              id={item.comment.comment}
              onClick={(e) => handleDeleteNotice(e)}
            />
          </div>
        </div>
      );
    });
  }

  return (
    <>
      {/* {console.log("NOTIFICATION ===> ", authState.userProfile.notifications)} */}

      {console.log("state noti", notifications)}
      {console.log("notive", notice)}

      <div>
        <p className="likecount1">likes: {likeCount}</p>

        {/* {likesMap} */}

        <div>
          {/* {notice.length */}
          {notifications.length
            ?
            (
              <div>
                <div className="border">
                  {/* <p className="flex flex-center">Comment Likes </p> */}
                  {/* {profile.data.notifications.filter((obj) => Object.keys(obj) == "like").map((item) => { */}
                  {/* {notice.filter((obj) => Object.keys(obj)[0] === "like").map((item, i) => { */}
                  {notice.filter((obj) => Object.keys(obj)[0] === "like").map((item, i) => {
                    console.log("LIKE comment", item)

                    return (
                      <div key={i}>
                        <div className="notificationInfo" >
                 
                          <div className="contactimgnot"></div>
                          <div className="notright">
                            <div>
                              <div
                                className="notusername"
                                onClick={() => nav("/profile/" + item.like.userId)}
                                style={{ textDecoration: "none", font: "black" }}
                                key={i}
                              >
                                {" "}
                                {` ${item.like.user}   `}{" "}
                              </div>
                            </div>

                            <div className="notcontent">
                              <p className="liketext">liked your</p>

                              <div style={{ marginRight: "10px" }}>
                                <div onClick={() => nav(`/feed/${item.like.ogFeed}#${item.like.likedDoc}`)}
                                  className="comment1"
                                  style={{ textDecoration: "none", font: "black" }}
                                  to={`/feed/${item.like.ogFeed}#${item.like.likedDoc}`}
                                >
                                  {" "}
                                  comment{" "}
                                </div>
                              </div>
                            </div>

                            <div className="moment">{convertDate(item.like.createdAt)}</div>
                          </div>
                          <div>

                            <TiDeleteOutline
                              style={{ float: "right" }}
                              id={item.i}
                              // id={item.comment.comment}
                              onClick={(e) => handleDeleteNotice(e)}
                            />

                            {/* <i className="fas fa-skull-crossbones"
                              style={{ float: "right" }}
                              id={item.i}
                              onClick={(e) => handleDeleteNotice(e)}
                            ></i> */}
                          </div>

                          {/* </p> */}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <br />
<hr />
                <div className="border">
                  {/* <p className="flex flex-center">Comments: {commentCount}</p> */}
                  <p className="likecount1">comments: {commentCount}</p>
                  <br />

                  {notice.filter((obj) => Object.keys(obj)[0] === "comment").map((item, i) => {
                    // {profile.data.notifications.filter((obj) => Object.keys(obj) == "comment").map((item) => {
                    console.log("Comment-item", item)
                    return (
                      <div key={i}>
                        <div className="notificationInfo">
                          {/* <p> */}
                          

                          <div className="contactimgnot"></div>
                          <div className="notright">
                            <div>
                              <div
                                className="notusername"
                                onClick={() => nav("/profile/" + item.comment.userId)}
                                style={{ textDecoration: "none", font: "black" }}
                                key={i}
                              >
                                {" "}
                                {` ${item.comment.authorName}   `}{" "}
                              </div>
                            </div>

                            <div className="notcontent">
                              <p className="liketext">liked your</p>

                              <div style={{ marginRight: "10px" }}>
                                <div onClick={() => nav(`/feed/${item.comment.ogFeed}#${item.comment.parentDoc}`)}
                                  className="comment1"
                                  style={{ textDecoration: "none", font: "black" }}
                                  // to={`/feed/${item.like.ogFeed}#${item.like.likedDoc}`}
                                >
                                  {" "}
                                  comment{" "}
                                </div>
                              </div>
                            </div>

                            <div className="moment">{convertDate(item.comment.createdAt)}</div>
                          </div>


                          <TiDeleteOutline
                              style={{ float: "right" }}
                              id={item.i}
                              // id={item.comment.comment}
                              onClick={(e) => handleDeleteNotice(e)}
                            />



                          {/* <div style={{ width: "80px" }}>
                            <Link
                              style={{ textDecoration: "none", font: "black" }} key={i} to={"/users/profile/" + item.comment.authorId}> {` ${item.comment.author} `}
                            </Link>
                          </div>

                          <div style={{ width: "150px", textAlign: "left" }}>
                            <Link to={`/feed/${item.comment.ogFeed}#${item.comment.parentDoc}`}>   :  {truncate(item.comment.comment)}` :
                            </Link>
                          </div>

                          <div style={{ width: "70px" }}>
                            {convertDate(item.comment.createdAt)}
                          </div>

                          <div>

                            <TiDeleteOutline
                              style={{ float: "right" }}
                              id={item.i}
                              onClick={(e) => handleDeleteNotice(e)}
                            />
                         
                          </div>     */}
                                                                         {/* Delete notice? */}
                          {/* </p> */}
                        </div>
                      </div>
                    )
                  })}
                </div>




              </div>

            )
            :
            (
              <p>nothing new...... maybe you should do some stuff</p>
            )


          }


          <div>

          </div>


        </div>





      </div>

      <br />

      {/* <div>
        <p className="likecount1">comments: {commentCount}</p>

        {commentMap}
      </div> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authState: state.auth,
  };
};
// const mapDispatchToProps = (dispatch) => {
//     return {
//         getUser: () => dispatch(getUser())
//     }
// }

export default connect(mapStateToProps, null)(NotificationLogic);
