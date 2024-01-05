import React from 'react'
import Navbar from '../../../components/navbar/Navbar'
function Header(props) {
    
    return (
        // <div>Header</div>
        <Navbar handleShowRightDM={props.handleShowRightDM}/>
    )
}

export default Header