import { FaSearch } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
// import { GrGroup } from "react-icons/gr";
import { RiMacbookFill } from "react-icons/ri";

import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineMessage } from "react-icons/md";

import { IoNotificationsCircleOutline } from "react-icons/io5";

// import imgtest from '../../imagess/imgtest3.png'

import { useNavigate } from "react-router-dom";


import {connect} from 'react-redux'



const Navbar = ({props, authState}) => {
    // console.log("header prop", props)
    
    let nav = useNavigate()
    return (
        <div className="header">
            <div className="header-left">

                <span className="logo">SHOW CASE</span>
                <div className="search-container">
                    <form action="/action_page.php">
                        <input type="text" placeholder="Search.." name="search" />
                        <button type="submit"><FaSearch className="search-icon" /></button>
                    </form>
                </div>
            </div>
            <div className="header-right">

                <span className="headerRightDiv iconContainer" ><IoHome title="Home" className="homeIcon navIcons" /></span>
                <span className="headerRightDiv iconContainer" ><FaUserFriends title="Friends" onClick={()=>props.handleShowRightDM()} className="friendIcon navIcons" /></span>
                <span className="headerRightDiv iconContainer"  ><RiMacbookFill title="Instant Message" className="groupIcon navIcons" /></span>

            </div>

            <div className="right">
                {/* plus sign dropdown */}
                <span className="" ><AiOutlinePlus style={{ color: 'rgb(19, 134, 215)' }} className="navIcons " /></span>

                {/* unread messges */}

                <span className="" ><MdOutlineMessage title="Messages" className="navIcons" /></span>
                {/* notifications */}

                <a href="#" className="notification">

                    <IoNotificationsCircleOutline title="Notifications" className="navIcons"/>

                    <span className="badge">3</span>
                </a>
                {/* user image goes here */}
                <span className=" othertest" ><img className="imgtest" onClick={() => nav("/profile/")} src={`http://localhost:5000${authState.userProfile.profileImg}`} alt="" /></span>

            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    // console.warn("state redux", state)
    return {
        authState: state.auth
    }
}

export default connect(mapStateToProps, null)(Navbar)