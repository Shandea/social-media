import { Outlet, useOutlet } from 'react-router-dom'

import LeftSideNav from "./leftNav/LeftSideNav";
import FriendsComponent from './friendsList/FriendsComponent';
// import Home from "./../../home/Home"

const  Body = (props)=> {

    // let out = useOutlet()
    return (
        <>
            <div className="bodyMainContainer" >


                <div className="LeftSideNavContainer" >
                    <LeftSideNav />
                </div>


                <div className="MainContentContainer">

                    {console.log("Body Render")}
                    <Outlet />
                    {/* {out ? (<Outlet />) : null} */}

                </div>

                <div className="RightSideContainer" >
                    {/* add friendslist comp when built */}
                <FriendsComponent/>
                </div>

            </div>
        </>
    )
}

export default Body