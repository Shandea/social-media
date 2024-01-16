import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import convertDate from '../../util/convertDate'
import { TiDeleteOutline } from "react-icons/ti";
import { getUser } from "../../config/redux/actions/AuthActions"
import store from '../../config/redux/Store'
import truncate from "../../util/truncate"


const NotificationLogic = ({ authState }) => {

    const [notifications, setNotifications] = useState(authState.userProfile.notifications)

    useEffect(() => {
        console.log("usee=Effect", authState.userProfile.notifications)
        setNotifications(authState.userProfile.notifications)
    }, [])


    const handleDeleteNotice = (e) => {
        console.log("removing", e.target.id)
        // axios({
        //     method: 'POST',
        //     withCredentials: true,
        //     url: 'http://localhost:5000/api/removeNotice',
        //     data: { index: e.target.id }
        // })

        //     .then(res => {
        //         // console.log("remove res", res.data.notifications)
        //         setNotifications(res.data.notifications)
        //     })
        //     .catch(err => console.log("err", err))
    }


    let notice = []
    let likeCount
    let commentCount
    let likes
    let comments
    let likesMap
    let commentMap
    let masterNot 

    if (notifications) {

        likeCount = notifications.filter((obj) => Object.keys(obj) == "like").length
        console.log("like count", likeCount)




        commentCount = notifications.filter((obj) => Object.keys(obj) == "comment").length
        console.log("comment Count", commentCount)
        // 
        likes = notifications.filter((obj) => Object.keys(obj) == "like")
        // console.log("likes", likes)

        comments = notifications.filter((obj) => Object.keys(obj) == "comment")
        console.log("comments", comments)

        // masterNot = notifications.map((item, i ) =>{
        //     comments = notifications.filter((obj) => Object.keys(obj) == "comment")
        //     likes = notifications.filter((obj) => Object.keys(obj) == "like")

        // } )

        likesMap = likes.map((item, i) => {
            return (

                <div key={i}>
                    <div className="notificationInfo" style={{ display: 'flex' }}>
                        <div style={{ marginRight: '10px' }}>
                            <Link style={{ textDecoration: "none", font: "black" }} key={i} to={"/profile/" + item.like.userId}> {` ${item.like.user}   `} </Link>
                        </div>

                        <div style={{ marginRight: '10px' }}>
                            <p>
                                liked your
                            </p>
                        </div>

                        <div style={{ marginRight: '10px' }}>
                            <Link style={{ textDecoration: "none", font: "black" }} to={`/feednotification/${item.like.ogFeed}#${item.like.likedDoc}`}> comment </Link>
                        </div>

                        <div style={{ marginRight: '10px' }}>
                            {convertDate(item.like.createdAt)}
                        </div>

                        <TiDeleteOutline
                            style={{ float: "right" }}
                            id={i}
                            onClick={(e) => handleDeleteNotice(e)}
                        />
                    </div>
                </div>
            )
        })


        commentMap = comments.map((item) => {
            console.log("ITEM", item)
            return (
                <div key={item.i}>
                    <div className="notificationInfo" style={{ display: 'flex' }}>
                        {/* <p> */}

                        <div style={{ marginRight: '10px' }}>
                            <Link
                                style={{ textDecoration: "none", font: "black" }} key={item.i} to={"/profile/" + item.comment.authorId}> {` ${item.comment.authorName} `}
                            </Link>
                        </div>
                        <div style={{ marginRight: '10px' }}>

                            <p>said </p>
                        </div>
                        <div style={{ marginRight: '10px' }}>
                     '{truncate(item.comment.comment)}'
                        </div>


                        <Link style={{ marginRight: '10px' }} to={`/feednotification/${item.comment.ogFeed}#${item.comment.parentDoc}`}> about post 
                        </Link>

                        <div style={{ marginRight: '10px' }}>
                            {convertDate(item.comment.createdAt)}
                        </div>

                        <TiDeleteOutline
                            style={{ float: "right" }}
                            id={item.comment.comment}
                            onClick={(e) => handleDeleteNotice(e)}
                        />
                    </div>
                </div>
            )
        })



    }


    return (
        <>
            {/* {console.log("NOTIFICATION ===> ", authState.userProfile.notifications)} */}

            {console.log("state noti", notifications)}
            <div>notificationLogic</div>
            <div>
                <p>likes: {likeCount}</p>

                {likesMap}

            </div>

            <br />


            <div>
                <p>comments: {commentCount}</p>

                {commentMap}

            </div>
        </>
    )
}

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

export default connect(mapStateToProps, null)(NotificationLogic)