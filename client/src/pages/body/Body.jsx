import React from 'react'

import { Outlet, useOutlet } from 'react-router-dom'

import LeftSideNav from "../leftSideNav/LeftSideNav";
import Home from "../home/Home"

export default function Body() {

    let out = useOutlet()




    return (
        <>

            <div
                style={{ display: 'flex', flexDirection: 'row', border: "1px solid yellow" }}
            >


                <div id="LeftSideNavContainer" style={{ width: '15%', border: '1px solid blue' }}>
                    <LeftSideNav />
                </div>


                <div id="MainContentContainer" style={{ width: '80%', height: '100%' }}>

                    {console.log("Body Render")}
                    <Outlet />
                    {/* {out ? (<Outlet />) : null} */}

                </div>

                <div id="RightSideContainer" style={{ width: '15%', border: '1px solid blue' }}>
                    {/* add friendslist comp when built */}
                    friend list
                </div>

            </div>
        </>
    )
}
