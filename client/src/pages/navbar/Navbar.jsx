import { FaSearch } from "react-icons/fa";


const Navbar = () => {
    return (
        <div class="header">
            <div className="header-left">

            <span href="#default" class="logo">CompanyLogo</span>
            <div class="search-container">
                <form action="/action_page.php">
                    <input type="text" placeholder="Search.." name="search" />
                    <button type="submit"><FaSearch className="search-icon"/></button>
                </form>
            </div>
            </div>
            <div class="header-right">
                <span className="headerRightDiv" >Home</span>
                <span className="headerRightDiv" >Contact</span>
                <span className="headerRightDiv" >About</span>
            </div>
        </div>
    )
}

export default Navbar