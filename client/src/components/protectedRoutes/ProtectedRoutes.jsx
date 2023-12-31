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
        console.log("Prot RT useEffect FIRE")
        axios.defaults.withCredentials = true
        axios({
            method: "GET",
            withCredentials: true,
            url: 'http://localhost:5000/user/authCheck',
        })
        // API.getUser()
            .then(res => {
                console.log("still good", res.data)
                if (res.data.message == "proceed") {
                    // nav("/feed")
                    return
                    //store res.data (user) in redux
                } else {
                    console.log("ProtecteRoute bad auth should reroute")
                    nav("/")
                    // nav
                }
            })
            .catch(err => {
                nav("/")
                console.log(err)
            })
    }, [])

    useEffect(() => {
        API.getUserProfile()
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
            {/* <div>ProtectedRoutes</div> */}
            {console.log("Protected Route HIT")}
            {/* {console.log(useOutlet() ? "outlet true " : "outlet false")} */}

            {/* replace true with context authed user once built */}
            <MainContainer />
            {/* {true ? <MainContainer /> : nav("/")} */}

        </>


    )
}

const mapStateToProps = (state) => {
    return {
        authState: state.auth

    }
}
// first param is state, 2nd is dispatch (functions / actions)
export default connect(mapStateToProps, null)(ProtectedRoutes)