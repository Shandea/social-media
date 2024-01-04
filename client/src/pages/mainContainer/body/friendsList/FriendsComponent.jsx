import './FriendsComponent.css'

import API from '../../../../config/api/'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
const FriendsComponent = ({ getAll }) => {
  console.log("api", getAll)


  useEffect(() => {
    API.userAll()
  }, [])
  return (
    <div className='friendscomponentcontainer'>
      {
        getAll.allUsers.map((friends, i)=>friends.map((friend,i)=>{
          return(
            <div key={i}>

              {
                friend?.profileImg ?
                (
                  <div key={i}>
                    <Link  className='friendLink' to={`/profile/${friend._id}`}>
                  <img  alt='' src={`http://localhost:5000${friend.profileImg}`}/>
                  <h4>{friend.username}</h4>
                  </Link>
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

      {/* <h2>Friends</h2>
        <input placeholder='🔍Im a search box? maybe...' />
        <p>feeeed me</p>
        <div>
          <img src={abc} alt=''/>
          <h4>Social Friend</h4>
        </div> */}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    getAll: state.auth
  }
}

export default connect(mapStateToProps, null)(FriendsComponent)
