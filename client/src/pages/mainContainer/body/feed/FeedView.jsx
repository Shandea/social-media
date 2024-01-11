import React, { useState, useEffect } from 'react'

import FeedContainer from "../../../../components/feeds/feedContainer/FeedContainer"

import AddFeed from "../../../../components/feeds/addFeed/AddFeed"

import axios from 'axios'
import FeedActions from '../../../../components/feeds/FeedActions'


export default function Feed() {
    // feed container... a feed 


    useEffect(() => {
        

        axios({
            method: "GET",
            url: "http://localhost:5000/api/getfeeds",
            withCredentials: true,
        })
            .then(res => {
                console.log("res feed views", res)
                setFeeds(res.data)
            })
            .catch(err => console.log("get feed err", err))
        

    }, [])

    const [feeds, setFeeds] = useState([])

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

                console.log("FEED LIKE UPDATE", feeds.find((item) => item._id === res.data._id))

                setFeeds(prev => prev.map((item) => item._id === res.data._id ? res.data : item))

            })

    }


    return (

        <>
            {console.log("feed state", feeds)}
            <div id="FeedTopAction"
                style={{ border: "black 2px solid", display: 'flex', justifyContent: 'space-evenly' }}
            >

                {/* <FeedActions /> */}

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




            {/* ???????????????????????/ */}

        </>
    )
}
