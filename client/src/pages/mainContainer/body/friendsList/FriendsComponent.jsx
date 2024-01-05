import './FriendsComponent.css'

import API from '../../../../config/api/'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
const FriendsComponent = ({ getAll }) => {

  useEffect(() => {
    API.userAll()
  }, [])
  return (
    <div className='friendscomponentcontainer'>
      {/* <input placeholder='🔍Im a search box? maybe...' /> */}
      {
        getAll.allUsers.map((friends, i)=>friends.map((friend,i)=>{
          return(
            <div key={i}>

              {
                friend?.profileImg ?
                (
                  <div className='friendCard' key={i}>
                    <Link  className='friendLink' to={`/profile/${friend._id}`}>
                  <img  alt='' src={`http://localhost:5000${friend.profileImg}`}/>
                  <h4>{friend.username}</h4>
                  </Link>
                  <div className='statusDiv'>
                    <h6>ONLINE</h6>
                    <div className='onlineStatus'></div>
                  </div>
                  </div>
                  
                ) :
                (
                  <p>❌</p>
                )
              }

              
            </div>
          )
        }))
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    getAll: state.auth
  }
}

export default connect(mapStateToProps, null)(FriendsComponent)
