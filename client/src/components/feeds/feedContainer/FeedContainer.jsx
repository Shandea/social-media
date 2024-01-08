import React from 'react'
import "./FeedContainer.css"
import { IoCloseSharp } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";

import convertDate from "../../../util/convertDate"

function FeedContainer({ obj }) {

 


    return (
        <>
            {/* {console.log("FEED container props")} */}
            
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
                        <div className='friendimg'></div>
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
                            border: 'solid black 2px',
                            display: 'flex',
                            justifyContent: 'center',
                            height: '200px',
                            width: '200px',
                            
                            backgroundImage: `url("http://localhost:5000${obj.imgPath}"), url("http://localhost:5000/public/default.jpeg")`,
                            
                            backgroundRepeat: "no-repeat",
                            backgroundSize: 'cover'
                        }}
                        >

                        </div>
                    ) : (null)}
                    <div id="FeedContent" className='feedtext'>

                        {obj.feedContent}

                    </div>
<hr className='line'/>
                </div>

                <br />

                {/*  this will be it own reusable comp as well, when add comment is clicked.. it expands to a area to add a comment... when Comments is clicked comment populate from the DB, and render as a component very similar to this one with the same actions, reply options, likes, etc */}
                <div className='likecomment'>
                    <div className='like'><SlLike /> likes : {obj.likes}</div>
                    <div className='comment'><FaRegComment />comments :{obj.comments.length}</div>
                    




                </div>
                <hr className='line'/>
                <div className='addcomment'>
<div className='userimg'></div>
<input type="text" className='input1' placeholder='  Write a comment...'/>
                </div>
            </div>
           


        </>
    )
}

export default FeedContainer