import React, { useState, useEffect } from 'react'

import FeedContainer from "../../../../components/feeds/FeedContainer"

import AddFeed from "../../../../components/feeds/AddFeed"

import axios from 'axios'


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

                <div
                    style={{ border: "black 2px solid" }}

                > New</div>

                <div
                    style={{ border: "black 2px solid" }}

                >trending</div>

                <div
                    style={{ border: "black 2px solid" }}

                >My feeds</div>

                <div
                    style={{ border: "black 2px solid" }}

                >following</div>
            </div>

            <div id="FeedAddActions">(add) - opens modal to add feed ,|| search area to search feeds in DB </div>


            <AddFeed />



            {/* FOR ILLUSTRATIVE PURPOSE, this will be a map from the api endpoint rendering into <FeedContainer /> */}

            <div className='feedContainer'>
                {feeds.map((obj, i) => {
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
