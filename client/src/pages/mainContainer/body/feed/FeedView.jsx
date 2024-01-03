import React from 'react'

import FeedContainer from "../../../../components/feeds/FeedContainer"

export default function Feed() {
    // feed container... a feed 

    return (

        <>
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





            {/* FOR ILLUSTRATIVE PURPOSE, this will be a map from the api endpoint rendering into <FeedContainer /> */}

            <div className='feedContainer'>
                <FeedContainer />
            </div>

            <div className='feedContainer'>
                <FeedContainer />
            </div>

            <div className='feedContainer'>
                <FeedContainer />
            </div>

            <div className='feedContainer'>
                <FeedContainer />
            </div>

        </>
    )
}
