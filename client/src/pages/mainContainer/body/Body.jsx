import { Outlet, useOutlet } from 'react-router-dom'

import LeftSideNav from "./leftNav/LeftSideNav";
import FriendsComponent from './friendsList/FriendsComponent';
// import Home from "./../../home/Home"

const  Body = (props)=> {

    return (
        <>
            <div className="bodyMainContainer" >

                <div className="LeftSideNavContainer" >
                    <LeftSideNav />
                </div>


                <div className="MainContentContainer">
                    {/* {console.log("Body Render")} */}
                    <Outlet />
                </div>

                <div className="RightSideContainer" >
                <FriendsComponent/>
                </div>

            </div>
        </>
    )
}

export default Body