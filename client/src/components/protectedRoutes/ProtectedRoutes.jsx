import React, { useEffect, useState } from 'react'
import { Outlet, Navigate, useNavigate, useOutlet, useParams, useLocation } from 'react-router-dom'

import axios from 'axios'
import MainContainer from '../../pages/mainContainer/MainContainer'


function ProtectedRoutes() {
    let nav = useNavigate()
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