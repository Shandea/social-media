import { FaSearch } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";




const Navbar = () => {
    return (
        <div className="header">
            <div className="header-left">

                <span  className="logo">CompanyLogo</span>
                <div className="search-container">
                    <form action="/action_page.php">
                        <input type="text" placeholder="Search.." name="search" />
                        <button type="submit"><FaSearch className="search-icon" /></button>
                    </form>
                </div>
            </div>
            {/* <div className="header-right"> */}
                <span className="headerRightDiv" ><IoHome className="homeIcon"/></span>
                <span className="headerRightDiv" ><FaUserFriends className="friendIcon" /></span>
                <span className="headerRightDiv" ><GrGroup className="groupIcon"/></span>
            {/* </div> */}
        </div>
    )
}

export default Navbar