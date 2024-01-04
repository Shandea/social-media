import { FaSearch } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
// import { GrGroup } from "react-icons/gr";
import { RiMacbookFill } from "react-icons/ri";

import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineMessage } from "react-icons/md";

import { IoNotificationsCircleOutline } from "react-icons/io5";

import imgtest from '../../imagess/imgtest3.png'

import { useNavigate } from "react-router-dom";




const Navbar = () => {
    
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
                <span className="headerRightDiv iconContainer" ><IoHome className="homeIcon navIcons" /></span>
                <span className="headerRightDiv iconContainer" ><FaUserFriends className="friendIcon navIcons" /></span>
                <span className="headerRightDiv iconContainer"  ><RiMacbookFill className="groupIcon navIcons" /></span>
            </div>

            <div className="right">
                {/* plus sign dropdown */}
                <span className="" ><AiOutlinePlus style={{ color: 'rgb(19, 134, 215)' }} className="navIcons " /></span>

                {/* unread messges */}

                <span className="" ><MdOutlineMessage className="navIcons" /></span>
                {/* notifications */}

                {/* <span className="noti" >
                    <span className="badge">3</span>
                    <IoNotificationsCircleOutline className="navIcons" />
                </span> */}

                <a href="#" className="notification">
                    <IoNotificationsCircleOutline className="navIcons"/>
                    <span class="badge">3</span>
                </a>
                {/* user image goes here */}
                <span  className=" othertest" ><img className="imgtest"onClick={()=>nav("/profile/")} src={imgtest} alt="" /></span>

            </div>
        </div>
    )
}

export default Navbar