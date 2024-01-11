import React, { useState } from 'react'
import AddFeedImgForm from '../AddFeedImgForm'

import { FaPhotoFilm } from "react-icons/fa6";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import "./AddFeedActions.css"


const AddFeedActions = ({ handleFeedSubmit, handleSelectedFiles }) => {

    const [expandOptions, setExpandOptions] = useState(false)

    const handleExpandOptions = () => {
        expandOptions ? setExpandOptions(false) : setExpandOptions(true)
    }

    const [addImg, setAddImage] = useState(false)

    return (

        <div id='AddNewFeedActions'>

            <section id="FeedAddNewActions">

                <div><FaPhotoFilm
                    className='icon2'
                    onClick={(e) => setAddImage(true)}
                />
                Add Img
                </div>

                <div>
                    <MdOutlineEmojiEmotions 
                    className='icon3' 
                    onClick={(e) => handleFeedSubmit(e)} 
                    />
                    Submit
                    </div>

                {/* <div onClick={(e) => setAddImage(true)}>
                    add img
                </div> */}

                {/* <div onClick={(e) => handleExpandOptions()}>
                    ( ... )
                </div> */}

                {/* <div onClick={(e) => handleFeedSubmit(e)}>
                    submit
                </div> */}

            </section>

            {addImg &&
                <div>
                    <AddFeedImgForm handleFeedSubmit={handleFeedSubmit} handleSelectedFiles={handleSelectedFiles} />
                </div>
            }

            {/* {expandOptions &&

                <section id="expandOptions">
                    <div>poll</div>
                    <div>vote</div>
                    <div>question</div>
                    <div>stuff</div>
                </section>
            } */}
        </div>
    )
};

export default AddFeedActions