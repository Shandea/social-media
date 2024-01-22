import React, { useState } from 'react'
import axios from 'axios'

// const banner1 = require('http://localhost:5000/public/banner/banner1.jpg')
// import banner2 from "http://localhost:5000/public/banner/banner2.jpg"
// import banner3 from "http://localhost:5000/public/banner/banner3.jpg"
// import banner4 from "http://localhost:5000/public/banner/banner4.jpg"
// import banner5 from "http://localhost:5000/public/banner/banner5.jpg"
// import banner6 from "http://localhost:5000/public/banner/banner6.jpg"

const BannerSelect = () => {



    const [banner, setBanner] = useState()





    const handleUpdateBanner = () => {

    }

    const handleSubmit = () => {

    }

    return (
        <>
            <div>BannerSelect</div>

            <div 
            onClick={(e) => handleSubmit(e)}
            style={{
                backgroundImage: `url("http://localhost:5000/public/banner/banner1.jpg"), url("http://localhost:5000/public/default.jpeg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: 'cover'
            }}
            
            >
            </div>


<button onClick={handleSubmit}>update</button> 

        </>
    )

}



export default BannerSelect