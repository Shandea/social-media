import React, { useEffect, useState } from 'react'
import { Outlet, Navigate, useNavigate, useOutlet, useParams, useLocation } from 'react-router-dom'

import axios from 'axios'
import MainContainer from '../../pages/mainContainer/MainContainer'


import { connect } from 'react-redux'
import API from '../../config/api/Api'


function ProtectedRoutes() {
    let nav = useNavigate()
    
    const [loggedIn, setLoggedIn] = useState(false)
    
    useEffect(() => {

        // axios.defaults.withCredentials = true
        // axios({
        //     method: "GET",
        //     // withCredentials: true,
        //     url: 'http://localhost:5000/user/authCheck',
        // })
            API.getUser().then(res => {
                console.log("still good", res)
                if(res.message !== "proceed"){
                    nav("/")
                }else {
                    //store res.data (user) in redux
                
                    
                }
              
            })
            .catch(err => console.log(err))
    }, [])


    // useEffect(() => {

    //     axios.defaults.withCredentials = true
    //     axios({
    //         method: "GET",
    //         // withCredentials: true,
    //         url: 'http://localhost:5000/user/authCheck',
    //     })
    //         .then(res => {
    //             console.log("still good", res)
    //             if(res.data.message !== "proceed"){
    //                 nav("/")
    //             }
              
    //         })
    //         .catch(err => console.log(err))
    // }, [])


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

const mapDispatchToProps=(dispatch)=>{
    return{
    } 
}

export default connect(null, mapDispatchToProps)(ProtectedRoutes)