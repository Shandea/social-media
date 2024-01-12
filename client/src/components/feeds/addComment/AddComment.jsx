import React, { useState } from 'react'

import axios from 'axios'

const AddComment = ({ authState, obj }) => {

    const [addComment, setAddComment] = useState({
        content: ""
    })


    const handleChange = (e) => {

        setAddComment(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
            authorId: authState.user.userId,   /// ID of comment writer
            authorName: authState.user.username, // Name of comment Writer
            likes: 0,                            // Starting Likes
            OgFeed: obj.OgFeed,                  // OG feed for notifications
            parentAuthorName: obj.authorName,        // Parent Doc Author for notification
            parentAuthorId: obj.author,
            parentDoc: obj._id



        }))

    }

    const handleAddComment = (e) => {
        console.log("submiting", addComment)
        axios({
            method: "POST",
            url: "http://localhost:5000/api/addFeedComment",
            data: addComment,
            withCredentials: true,
        })

    }


    return (
        <>
            {console.log("ADD COMMENT", addComment)}
            {console.log("authState", authState)}
            {console.log("obj => ", obj)}

            <div className='addcomment'>

                <div className='userimg'

                    style={{
                        border: 'solid black 2px',
                        display: 'flex',
                        justifyContent: 'center',
                        height: '20px',
                        width: '20px',
                        borderRadius: '25px',
                        backgroundImage: `url("http://localhost:5000${authState.userProfile.profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: 'cover'
                    }}

                >

                </div>

                <input
                    type="text"
                    value={addComment.content || ""}
                    name="content"
                    className='input1'
                    placeholder='  Write a comment...'
                    onChange={(e) => handleChange(e)}

                />


                <input
                    onClick={(e) => handleAddComment(e)}
                    type="submit"></input>

            </div>



        </>


    )
}


export default AddComment