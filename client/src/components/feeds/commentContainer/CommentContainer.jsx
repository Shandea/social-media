import React, { useState } from 'react'
import "../feedContainer/FeedContainer.css"
import { IoCloseSharp } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";

import convertDate from "../../../util/convertDate"

// import AddComment from "../addComment/AddComment"

import AddCommentComment from "./AddCommentComment"

import "./commentContainer.css"
import axios from 'axios'

import { connect } from 'react-redux'

function CommentContainer({ obj, authState, item, handleAddLike, handleSetFeeds }) {

    const [viewComment, setViewComment] = useState(false)


    const handleViewComment = (e) => {
        viewComment ? setViewComment(false) : setViewComment(true)
    }



    return (
        <>
            {/* //     {console.warn("COMMENT container props", obj)}
        //     {console.log("Coment ITEM", item)} */}

            <div
                id="CommentContainer" className='FC'
            >

                <div id="User Information"
                    style={{

                        justifyContent: 'space-between',
                        display: 'flex'
                    }}
                >
                    <div className='userpost'>
                        <div className='friendimg'
                            style={{
                                border: 'solid black 2px',
                                display: 'flex',
                                justifyContent: 'center',
                                height: '30px',
                                width: '30px',
                                borderRadius: '25px',
                                backgroundImage: `url("http://localhost:5000${item.authorImg}"), url("http://localhost:5000/public/default.jpeg")`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: 'cover'
                            }}
                        >

                        </div>
                        <div className='nametime'>
                            <div className='name'>{item.authorName}</div>
                            <div className='time'>{convertDate(item.createdAt)}</div>
                        </div>
                    </div>

                    <div className='close'><IoCloseSharp /></div>

                </div>

                <br />

                <div id="FeedContent"
                    style={{

                        height: '80vh',
                        height: "fit-content",

                    }}
                >
                    {item.imgPath ? (

                        <div id="FeedImage"

                            style={{
                                border: 'solid black 2px',
                                display: 'flex',
                                justifyContent: 'center',
                                height: '200px',
                                width: '200px',
                                backgroundImage: `url("http://localhost:5000${item.imgPath}"), url("http://localhost:5000/public/default.jpeg")`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: 'cover'
                            }}
                        >

                        </div>
                    ) : (null)}
                    <div id="CommentContent" className='feedtext'>

                        {item.content}

                    </div>
                    <hr className='line' />
                </div>

                <br />

                {/*  this will be it own reusable comp as well, when add comment is clicked.. it expands to a area to add a comment... when Comments is clicked comment populate from the DB, and render as a component very similar to this one with the same actions, reply options, likes, etc */}
                <div className='likecomment'>


                    <div
                        className='like'
                        id={item._id}
                        type="comment"
                        onClick={(e) => handleAddLike(e)}
                    >
                        <SlLike id={item._id} />

                        {item.likes}

                    </div>

                    <div
                        onClick={(e) => handleViewComment(e)}
                        className='comment'><FaRegComment />{item?.comments?.length}</div>

                </div>

                <hr className='line' />

                {viewComment && item.comments.map((item, i) => {
                    return (
                        <div id="feed-comment"
                            style={{ marginTop: "20px" }}
                        >
                            <CommentContainer
                                // <Feed
                                // authedUser={authState.user.userId}
                                item={item}
                                key={i}
                                obj={obj}
                                i={i}
                                handleAddLike={handleAddLike}
                                handleSetFeeds={handleSetFeeds}
                            />

                            <div id="TEST"></div>
                        </div>
                    )
                }
                )}


                {/* <AddCommentComment
                    // authState={authState} 
                    handleSetFeeds={handleSetFeeds}
                    // handleAddFollow={handleAddFollow}
                    obj={obj}
                    item={item} />

 */}

            </div>



        </>
    )
}

const mapStateToProps = (state) => {
    return {
        authState: state.auth
    }
}
export default connect(mapStateToProps, null)(CommentContainer)

