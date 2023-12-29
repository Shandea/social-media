import React, { useEffect, useState } from 'react'
import { Outlet, Navigate, useNavigate, useOutlet, useParams, useLocation } from 'react-router-dom'

import axios from 'axios'


function ProtectedRoutes() {
    let nav = useNavigate()
    return (
        <>
            <div>ProtectedRoutes</div>
            {console.log("Protected Route HIT")}
            {console.log(useOutlet() ? "outlet true " : "outlet false")}

            {/* replace true with context authed user once built */}

            {true ? <Outlet /> : nav("/")}

        </>


    )
}

export default ProtectedRoutes