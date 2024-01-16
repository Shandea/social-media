import React, { useState } from 'react'
import "./FeedContainer.css"
import { IoCloseSharp } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";

import convertDate from "../../../util/convertDate"

import AddComment from "../addComment/AddComment"
import { Link } from "react-router-dom"

import axios from 'axios'

import { connect } from 'react-redux'
import CommentContainer from '../commentContainer/CommentContainer';

function FeedContainer({ obj, handleAddLike, authState , handleSetFeeds}) {


    const [viewComment, setViewComment] = useState(false)
    
    const handleViewComment = (e) => {
        viewComment ? setViewComment(false) : setViewComment(true)
    }


    return (
        <>
            {/* {console.log("FEED container props", obj)} */}

            <div
                id="FeedContainter" className='FC'
            >

                <div id="User Information"
                    style={{

                        justifyContent: 'space-between',
                        display: 'flex'
                    }}
                >
                    <div className='userpost'>
                        <Link to={`/profile/${obj.author}`} >
                            <div className='friendimg'
                                style={{
                                    border: 'solid black 2px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    height: '50px',
                                    width: '50px',
                                    borderRadius: '25px',
                                    backgroundImage: `url("http://localhost:5000${obj.authorImg}"), url("http://localhost:5000/public/default.jpeg")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: 'cover'
                                }}
                            >

                            </div>
                        </Link>
                        <div className='nametime'>


                            <div className='name'>{obj.authorName}</div>



                            <div className='time'>{convertDate(obj.createdAt)}</div>
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
                    {obj.imgPath ? (

                        <div id="FeedImage"

                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                height: '500px',
                                width: '100%',
                                backgroundImage: `url("http://localhost:5000${obj.imgPath}"), url("http://localhost:5000/public/default.jpeg")`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: 'cover',
                                backgroundPosition: "center"
                            }}
                        >

                        </div>
                    ) : (null)}
                    <div id="FeedContent" className='feedtext'>

                        {obj.feedContent}

                    </div>
                    <hr className='line' />
                </div>

                <br />

                {/*  this will be it own reusable comp as well, when add comment is clicked.. it expands to a area to add a comment... when Comments is clicked comment populate from the DB, and render as a component very similar to this one with the same actions, reply options, likes, etc */}
                <div className='likecomment'>

                    {/* {console.log("pbj id", obj._id)} */}

                    <div
                        className='like'
                        name="feed"
                        type="feed"
                        id={obj._id}
                        onClick={(e) => handleAddLike(e)}
                    >
                        <SlLike id={obj._id} />

                        {obj.likes}

                    </div>

                    <div className='comment'><FaRegComment
                        onClick={(e) => handleViewComment(e)}
                    />{obj.comments.length}</div>

                </div>

                {/* //// Render comments here ??? */}

                {/* {console.warn("TEST MAP", obj.comments)} */}

                {viewComment && obj.comments.map((item, i) => {
                    return (
                        <div id="feed-comment"
                            style={{ marginTop: "20px" }}
                        >
                            <CommentContainer
                                // <Feed
                                authedUser={authState.user.userId}
                                item={item}
                                key={i}
                                obj={obj}
                                i={i}
                                // handleAddFollow={handleAddFollow}
                                handleAddLike={handleAddLike}
                            // trackFeed={trackFeed}
                            handleSetFeeds={handleSetFeeds}                            />

                            <div id="TEST"></div>
                        </div>
                    )
                }
                )}






                <hr className='line' />


                <AddComment authState={authState} handleSetFeeds={handleSetFeeds} obj={obj} />



            </div >



        </>
    )
}

const mapStateToProps = (state) => {
    return {
        authState: state.auth
    }
}
export default connect(mapStateToProps, null)(FeedContainer)

