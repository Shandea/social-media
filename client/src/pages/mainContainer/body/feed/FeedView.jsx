import React, { useState, useEffect } from 'react'

import FeedContainer from "../../../../components/feeds/FeedContainer"

import AddFeed from "../../../../components/feeds/AddFeed"

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
                console.log("res", res)
                setFeeds(res.data)
            })
            .catch(err => console.log("get feed err", err))

    }, [])

    const [feeds, setFeeds] = useState([])




    return (

        <>
            {console.log("feed state", feeds)}
            <div id="FeedTopAction"
                style={{ border: "black 2px solid", display: 'flex', justifyContent: 'space-evenly' }}
            >

                <FeedActions />

            </div>

            <AddFeed />



            {/* FOR ILLUSTRATIVE PURPOSE, this will be a map from the api endpoint rendering into <FeedContainer /> */}

            <div className='feedContainer'>
                {feeds.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).map((obj, i) => {
                    return (
                        <div key={i}>
                            <FeedContainer obj={obj} />
                        </div>
                    )

                })}
            </div>




            {/* ???????????????????????/ */}

        </>
    )
}
