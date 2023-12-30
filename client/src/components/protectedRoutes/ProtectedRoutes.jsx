import React, { useEffect, useState } from 'react'
import { Outlet, Navigate, useNavigate, useOutlet, useParams, useLocation } from 'react-router-dom'

import axios from 'axios'
import MainContainer from '../../pages/mainContainer/MainContainer'


function ProtectedRoutes() {
    let nav = useNavigate()
    
    const [loggedIn, setLoggedIn] = useState(false)
    
    useEffect(() => {

        axios.defaults.withCredentials = true
        axios({
            method: "GET",
            // withCredentials: true,
            url: 'http://localhost:5000/user/authCheck',
        })
            .then(res => {
                console.log("still good", res)
                if(res.data.message !== "proceed"){
                    nav("/")
                }
              
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <>
            <div>ProtectedRoutes</div>
            {console.log("Protected Route HIT")}
            {/* {console.log(useOutlet() ? "outlet true " : "outlet false")} */}

            {/* replace true with context authed user once built */}
            <MainContainer />
            {/* {true ? <MainContainer /> : nav("/")} */}

        </>


    )
}

export default ProtectedRoutes