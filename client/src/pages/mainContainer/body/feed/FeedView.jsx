import React, { useState, useEffect } from 'react'

import FeedContainer from "../../../../components/feeds/feedContainer/FeedContainer"

import AddFeed from "../../../../components/feeds/addFeed/AddFeed"

import axios from 'axios'
import FeedActions from '../../../../components/feeds/feedTopActions/Actions/FeedActions'

import SearchFeed from "../../../../components/feeds/feedTopActions/Search/SearchFeed"

import "./feedView.css"

export default function Feed() {
    // feed container... a feed 


    useEffect(() => {

        axios({
            method: "GET",
            url: "http://localhost:5000/api/getfeeds",
            withCredentials: true,
        })
            .then(res => {
                console.log("res", res)
                setFeeds(res.data)
            })
            .catch(err => console.log("get feed err", err))

    }, [])

    const [feeds, setFeeds] = useState([])

    const [feedSearch, setFeedSearch] = useState("")

    const handleAddLike = (e) => {
        console.log("adding like", e.target.id)

        axios({
            method: "put",
            url: "http://localhost:5000/api/feeds/addfeedlike",
            data: { id: e.target.id },
            withCredentials: true
        })
            .then(res => {
                console.log("add like RES", res)
                // console.log("FEED LIKE UPDATE", feeds.find((item) => item._id === res.data._id))
                setFeeds(prev => prev.map((item) => item._id === res.data._id ? res.data : item))
            })
    }

    const handleApiSearch = (e, input) => {
        console.log("handleAPISearch", input)
        // setFeedSearch(e.target.value)

        axios({
            method: "GET",
            url: `http://localhost:5000/api/searchFeed/${input}`,
            withCredentials: true
        })
            .then(res => setFeeds(res.data))
            .catch(err => console.log("ERR search feed", err))
    }


    ////    TOP ACTION button to get  filtered feeds

    const handleGetNewFeeds = () => {

        axios({
            method: "GET",
            url: "http://localhost:5000/api/getFeeds"
        })
            .then(got => {
                setFeeds(got.data)
            })
            .catch(err => console.log("err", err))
    }


    const handleFollowingFeeds = () => {

        axios({
            method: "GET",
            url: "http://localhost:5000/api/getFollowingFeeds",
            withCredentials: true,

        })
            .then(got => {
                setFeeds(got.data)
            })
            .catch(err => console.log("err", err))
    }


    const handleMyFeeds = (e) => {


        axios({
            method: "GET",
            url: "http://localhost:5000/api/getMyFeeds",
            withCredentials: true,

        })
            .then(got => {
                setFeeds(got.data)
            })
            .catch(err => console.log("err", err))
    }

    return (

        <>
            {console.log("feed state", feeds)}
            <div id="FeedTopAction"
            >

                <div id="filterActions">
                    
                    <div
                        onClick={(e) => handleGetNewFeeds(e)}
                    >
                        New

                    </div>

                    <div
                        onClick={(e) => handleFollowingFeeds(e)}

                    >Following</div>

                    <div
                        onClick={(e) => handleMyFeeds(e)}

                    >
                        My</div>



                </div>

                <div>

                    <SearchFeed
                        handleApiSearch={handleApiSearch}

                    />

                </div>



            </div>

            <AddFeed />


            {/* FOR ILLUSTRATIVE PURPOSE, this will be a map from the api endpoint rendering into <FeedContainer /> */}

            <div className='feedContainer' style={{
                marginTop: "20px",
                overflowY: "auto"
            }}>
                {feeds.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).map((obj, i) => {
                    return (
                        <div key={i}
                        >
                            <FeedContainer
                                handleAddLike={handleAddLike}
                                obj={obj} />
                        </div>
                    )

                })}
            </div>


        </>
    )
}
