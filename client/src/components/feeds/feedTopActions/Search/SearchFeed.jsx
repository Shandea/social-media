import React, { useState } from 'react'

import "./SeachFeed.css"

const SearchFeed = ({ handleApiSearch }) => {


    const [feedSearch, setFeedSearch] = useState("")


    const handleFeedSearch = (e) => {

        setFeedSearch(e.target.value)

    }

    const handleSubmitSearch = () => {

        // console.log("searching")
        // handleApiSearch(null, feedSearch)

    }

    return (


        <>
            {/* <div>SearchFeed</div> */}

            {/* {console.log("SEARCH FEED", feedSearch)} */}


            {/* <input placeholder='Search Feeds'></input> */}

            <div className='searchContainer'>
                <div className="addpost">

                    {/* <div
                        className='userimg'
                        style={{
                            backgroundImage: `url("http://localhost:5000${authState.userProfile.profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover'
                        }}

                    > */}

                    {/* </div> */}

                    <input
                        className='searchinput'
                        onChange={(e) => handleFeedSearch(e)}
                        name="feedSearch"
                        id="feedSearch"
                        value={feedSearch || ""}
                        placeholder="  Search Feeds"
                    >

                    </input>


                    <div>

                        <input className='inputbtn'
                            type="submit"
                            onClick={(e) => handleApiSearch(e, feedSearch)}
                        ></input>
                    </div>

                </div>
            </div>




        </>

    )
}

export default SearchFeed