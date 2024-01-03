import React, { useState, useEffect } from 'react'
import axios from 'axios'




export default function Profile() {

    useEffect(() => {

        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/user/getProfile"
        })
            .then(res => {
                console.log("res", res)
                setProfile(res.data)
            })


        /// this will go to redux

    }, [])


    const [profile, setProfile] = useState({})

    return (
        <>
            {console.log("profile", profile)}
            <div>Profile</div>
            <p>{profile?.firstName}</p>
            <p>{profile?.lastName}</p>
            <p>{profile?.email}</p>
            <p>{profile?.gender}</p>
            <p>{profile?.phone}</p>
            <p>{profile?.username}</p>
            <div

            >

                <div id="profileImg"
                    style={{ backgroundImage: `url(${"http://localhost:5000" + profile?.profileImg})`, backgroundRepeat: 'none', backgroundSize: 'contain', width: '100px', height: '100px' }}>
                </div>        
                    </div>

        </>
    )
}


