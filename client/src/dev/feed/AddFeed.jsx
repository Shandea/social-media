import React, { useState } from 'react'
import axios from 'axios'

import { connect } from 'react-redux'

 import AddFeedActions from './AddFeedActions'


// const AddFeed = ({authState}) => {
const AddFeed = (props) => {

    ///// pull in authed user
    console.warn("authstate", props)


    const [selectedFiles, setSelectedFiles] = useState([])

    const [addFeed, setAddFeed] = useState({
        author: "bobs ID",/// authed user from redux,
        authorName: "bob", //// 
        feedContent: "",
        likes: 0,
        image: {}
    })

    const handleFeedChange = (e) => {
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

        formData.append('author', addFeed.author)
        formData.append('authorName', addFeed.authorName)
        formData.append('feedContent', addFeed.feedContent)
        formData.append('likes', 0)



        console.log("FORMDATA", formData)


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


        setAddFeed(prev => ({
            ...prev,
            feedContent: ""
        }))

    }

    const handleSelectedFiles = (e) => {
        console.log("fiels", e.target.files)

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
                {console.log("add feed", addFeed)}
                {console.log("file", selectedFiles)}

                <section>

                    <textarea
                        onChange={(e) => handleFeedChange(e)}
                        name="feedContent"
                        id="feedContent"
                        value={addFeed.feedContent || ""}
                        placeholder="Whats on your mind?"
                        style={{ height: "228px", width: "335px" }}>


                    </textarea>

                </section>
                <AddFeedActions handleFeedSubmit={handleFeedSubmit} handleSelectedFiles={handleSelectedFiles} />
            </div>
        </>
    )
}


const mapStateToProps = (state) => {
    console.log("AUTHED USER", state)
    return {
      authState: state.auth
    }
  
  }

export default connect(mapStateToProps, null)(AddFeed)