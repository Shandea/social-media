import React, { useState } from 'react'

import "./SeachFeed.css"

const SearchFeed = ({ handleApiSearch }) => {


    const [feedSearch, setFeedSearch] = useState("")


    const handleFeedSearch = (e) => {

        setFeedSearch(e.target.value)

    }

    const handleSubmitSearch = () => {

       
    }

    return (


        <>


            <div className='searchContainer'>
                <div className="addpost">

             
<div className='searchleft'>
                    <input
                        className='searchinput'
                        onChange={(e) => handleFeedSearch(e)}
                        name="feedSearch"
                        value={feedSearch || ""}
                        placeholder="  Search Feeds"
                    >

                    </input>
</div>

                    <div className='searchright'>

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