import React, { useState, useEffect } from 'react'

import FeedContainer from "../../../../components/feeds/feedContainer/FeedContainer"

import AddFeed from "../../../../components/feeds/addFeed/AddFeed"

import axios from 'axios'
import FeedActions from '../../../../components/feeds/feedTopActions/Actions/FeedActions'

import SearchFeed from "../../../../components/feeds/feedTopActions/Search/SearchFeed"

import "./feedView.css"
import LeftSideNav from '../leftNav/LeftSideNav'
import FriendsComponent from '../friendsList/FriendsComponent'

export default function Feed() {
    // feed container... a feed 

    const [render, setRender] = useState(false)
    const [feeds, setFeeds] = useState([])

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
        

    }, [render])


    const [feedSearch, setFeedSearch] = useState("")



    const handleSetFeeds = (e) => {
        // setFeeds(input)

        console.warn("HandleSetFeed hit  ===>  Rerender Please")
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
        // render ? setRender(false) : setRender(true)
        // console.log("TOP lvl handle set feeds")
    }

    const handleAddLike = (e) => {
        console.warn("adding like", e.target.id, e.target.getAttribute("name"))
        // let type = e.target.getAttribute("type")

        let type = e.currentTarget.attributes['type'].value

        console.log("type", type)
        let payload = {
            type: e.currentTarget.attributes['type'].value,
            id: e.target.id

        }

        axios({
            method: "put",
            url: "http://localhost:5000/api/feeds/addfeedlike",
            data: { id: e.target.id },
            data: payload,
            withCredentials: true
        })
            .then(res => {
                console.log("add like RES", res)
                // console.log("FEED LIKE UPDATE", feeds.find((item) => item._id === res.data._id))
                setFeeds(prev => prev.map((item) => item._id === res.data._id ? res.data : item))
                handleSetFeeds()
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
            {console.warn("RENDER STATUS", render)}

<div className='mainfeedcontainer'>
<div className="feedcontainerleft"><LeftSideNav /></div>
<div className="feedcontainermiddle"><div id="FeedTopAction"
            >

                <div id="filterActions">
                <div>

<SearchFeed
    handleApiSearch={handleApiSearch}

/>

</div>
<hr className='line'/>
<div className='words'>
                    <div className='word'
                        onClick={(e) => handleGetNewFeeds(e)}
                    >
                        New

                    </div>

                    <div className='word'
                        onClick={(e) => handleFollowingFeeds(e)}

                    >Following</div>

                    <div className='word'
                        onClick={(e) => handleMyFeeds(e)}

                    >
                        My</div>
                        </div>



                </div>




            </div>

            <AddFeed handleSetFeeds={handleSetFeeds} />


            {/* FOR ILLUSTRATIVE PURPOSE, this will be a map from the api endpoint rendering into <FeedContainer /> */}

            <div className='feedContainer' style={{
                marginTop: "20px"
               
                // border: "1px solid black"
            }}>
                {feeds.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).map((obj, i) => {
                    return (
                        <div key={i}
                        >
                            <FeedContainer
                                handleSetFeeds={handleSetFeeds}
                                handleAddLike={handleAddLike}
                                obj={obj} />
                        </div>
                    )

                })}
            </div>
            </div>
<div className="feedcontainerright"><FriendsComponent /></div>
            

            </div>
        </>
    )
}
