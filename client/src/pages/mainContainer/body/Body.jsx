import { Outlet } from 'react-router-dom'

// import LeftSideNav from "./leftNav/LeftSideNav";
// import FriendsComponent from './friendsList/FriendsComponent';

import { connect } from 'react-redux';

const Body = (props) => {

    // console.log("body props", props)

    return (
        <>
            {
                <div className='main' >
                    {/* <LeftSideNav /> */}
                    {/* {console.log("Body Render")} */}
                    <Outlet />
                    {/* <FriendsComponent /> */}

                </div>
            }
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        authState: state
    }
}
export default connect(mapStateToProps, null)(Body)