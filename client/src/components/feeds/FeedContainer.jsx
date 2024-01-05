import React from 'react'

import convertDate from "../../util/convertDate"

function FeedContainer({ obj }) {
    return (
        <>
            {console.log("FEED container props", obj)}
            <div
                id="FeedContainter"
                style={{
                    border: '2px red solid',
                    margin: '20px',
                    height: "fit-content",
                    display: 'flex',
                    flexDirection: 'column'
                }}>

                <div id="User Information"
                    style={{
                        border: '1px yellow solid',
                        justifyContent: 'space-between',
                        display: 'flex'
                    }}
                >
                    <div style={{ border: "1px red solid" }}>{obj.authorName}</div>

                    <div style={{ border: "1px red solid" }}>follow user</div>

                    <div style={{ border: "1px red solid" }}>{convertDate(obj.createdAt)}</div>


                </div>

                <br />

                <div id="FeedContent"
                    style={{
                        border: '1px yellow solid',
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
                                backgroundImage: `url("http://localhost:5000${obj.imgPath}")`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: 'cover'
                            }}
                        >

                        </div>
                    ) : (null)}
                    <div id="FeedContent">

                        {obj.feedContent}

                    </div>

                </div>

                <br />

                {/*  this will be it own reusable comp as well, when add comment is clicked.. it expands to a area to add a comment... when Comments is clicked comment populate from the DB, and render as a component very similar to this one with the same actions, reply options, likes, etc */}
                <div
                    style={{
                        border: '1px yellow solid',
                        justifyContent: 'space-between',
                        display: 'flex'
                    }}
                >
                    <div style={{ border: "1px red solid" }}>likes : {obj.likes}</div>
                    <div style={{ border: "1px red solid" }}>comments :{obj.comments.length}</div>
                    <div style={{ border: "1px red solid" }}>add comment</div>




                </div>
            </div>



        </>
    )
}

export default FeedContainer