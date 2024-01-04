import React, { useState } from 'react'
import FeedAddImgForm from './FeedAddImgForm'

const AddFeedActions = ({ handleFeedSubmit, handleSelectedFiles}) => {

    const [expandOptions, setExpandOptions] = useState(false)

    const handleExpandOptions = () => {
        expandOptions ? setExpandOptions(false) : setExpandOptions(true)
    }

    const [addImg, setAddImage] = useState(false)

    return (

        <div id='AddNewFeedActions'>

            <section id="FeedAddNewActions">



                <div onClick={(e) => setAddImage(true)}>
                    add img
                    </div>

                <div onClick={(e) => handleExpandOptions()}>
                    ( ... )
                    </div>

                <div onClick={(e) => handleFeedSubmit(e)}>
                    submit
                </div>

            </section>

            {addImg &&
                <div>
                    <FeedAddImgForm handleFeedSubmit={handleFeedSubmit} handleSelectedFiles={handleSelectedFiles}/>
                </div>
            }

            {expandOptions &&

                <section id="expandOptions">
                    <div>poll</div>
                    <div>vote</div>
                    <div>question</div>
                    <div>stuff</div>
                </section>
            }
        </div>
    )
};

export default AddFeedActions