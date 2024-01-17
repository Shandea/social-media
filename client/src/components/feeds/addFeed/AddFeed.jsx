import React, { useState } from 'react'
import axios from 'axios'
import { FaShare } from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { connect } from 'react-redux'

import AddFeedActions from '../addFeedActions/AddFeedActions'
import "./AddFeed.css"


// const AddFeed = ({authState}) => {
const AddFeed = ({ authState, handleSetFeeds }) => {

    ///// pull in authed user
    // console.warn("authstate add feeed", authState)


    const [selectedFiles, setSelectedFiles] = useState([])

    const [addFeed, setAddFeed] = useState({
        author: authState.userProfile._id,/// authed user from redux,
        // authorName: authState.user.username, //// 
        feedContent: "",
        likes: 0,
        image: {}
    })

    const handleFeedChange = (e) => {
        // console.log("onChange", e.target.id, e.target.value)
        setAddFeed(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    const handleFeedSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()

        // if (selectedFiles) {

        // for (const file of selectedFiles) {
        formData.append('images', selectedFiles)
        // }
        // }
        // console.log("addFeed", addFeed)

        // formData.append('author', addFeed.userId)
        // formData.append('authorName', addFeed.username)
        formData.append('author', authState.userProfile._id)
        formData.append('authorName', authState.userProfile.username)
        formData.append('feedContent', addFeed.feedContent)
        formData.append('likes', 0)



        // console.log("FORMDATA", formData)


        axios({
            method: 'POST',
            url: "http://localhost:5000/api/addfeed",
            data: formData,
            headers: { 'Content-Type': "multipart/form-data" },
            withCredentials: true,
        })
            .then(added => {
                console.log("addedFeed", added)
            })
            .catch(err => console.log("feed submit err", err))

        handleSetFeeds()
        setAddFeed(prev => ({
            ...prev,
            feedContent: ""
        }))

    }

    const handleSelectedFiles = (e) => {
        // console.log("fiels", e.target.files)

        setAddFeed(prev => ({
            ...prev,
            image: e.target.files[0]
        }))
        setSelectedFiles(e.target.files[0])

    }




    return (
        <>


            <div id='AddNewFeed'>
                {/* {console.log(connect.getState())} */}

                {/* {console.log("Authed User", authState )} */}
                {/* {console.log("add feed", addFeed)}
                {console.log("file", selectedFiles)} */}

                {/* <section>

                    <textarea
                        onChange={(e) => handleFeedChange(e)}
                        name="feedContent"
                        id="feedContent"
                        value={addFeed.feedContent || ""}
                        placeholder="Whats on your mind?"
                        style={{ height: "228px", width: "335px" }}>


                    </textarea>

                </section> */}
            </div>

            <div className='postcontainer'>
                <div className="addpost">

                    <div
                        className='userimg'
                        style={{
                            backgroundImage: `url("http://localhost:5000${authState.userProfile.profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover'
                        }}

                    >

                    </div>

                    <input
                        className='input1'
                        onChange={(e) => handleFeedChange(e)}
                        name="feedContent"
                        id="feedContent"
                        value={addFeed.feedContent || ""}
                        placeholder="  Whats on your mind?"
                    >

                    </input>

                </div>
                <hr className='line' />
                <div className="addpostbottom">

                    <AddFeedActions handleFeedSubmit={handleFeedSubmit} handleSelectedFiles={handleSelectedFiles} />

                </div>
            </div>
        </>
    )
}


const mapStateToProps = (state) => {
    // console.log("AUTHED USER", state)
    return {
        authState: state.auth
    }

}

export default connect(mapStateToProps, null)(AddFeed)