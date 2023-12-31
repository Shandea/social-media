import { Outlet } from 'react-router-dom'

import LeftSideNav from "./leftNav/LeftSideNav";
import FriendsComponent from './friendsList/FriendsComponent';

import { connect } from 'react-redux';

const  Body = (props)=> {

    // console.log("body props", props)

    return (
        <>
        {

            props.chatFriends || props.authState.auth.showDM ?

             <div className="bodyMainContainer2" >

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

            </div>:

            <div className="bodyMainContainer" >

            <div className="LeftSideNavContainer" >
                <LeftSideNav />

            </div>


            <div className="MainContentContainer">
                <Outlet />
            </div>


            {/* <div className="RightSideContainer" >
            <FriendsComponent/>
            </div> */}

        </div>
        }
           
        </>
    )
}
const mapStateToProps =(state)=>{
    return {
        authState:state
    }
}
export default connect(mapStateToProps,null)(Body)