import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API from '../config/api/Api'

import { connect } from 'react-redux'


const Profile = ({authState})=> {
    console.log("user profile_:",authState.userProfile)
    let profile = authState.userProfile
    useEffect(() => {
        API.getUserProfile()
    }, [])

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
            <div>

                <div id="profileImg"

                    style={{ backgroundImage: `url(${"http://localhost:5000" + profile?.profileImg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', width: '100px', height: '100px' }}>
                </div>
            </div>

        </>
    )
}

const mapStateToProps = (state)=>{
    return {
        authState:state.auth
    }
}

export default connect(mapStateToProps,null)(Profile)
