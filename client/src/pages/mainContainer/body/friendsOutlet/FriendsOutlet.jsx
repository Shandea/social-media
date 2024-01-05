import "./FriendsOutlet.css";
import API from "../../../../config/api/Api";
import { useEffect } from 'react'
import { connect } from 'react-redux'






const FriendsOutlet = ({ getAll }) => {

  // console.log("FriendsOutlet: api: ", getAll)
  // useEffect(() => {
  //   API.userAll()
  // }, [])


  //btton functionality APIs here

const fakefriends=[
{
  username:"SBones",
  firstName:"Sarah",
  lastname:"Boneski",
  profileImg:"http://localhost:5000/public/images/65970df230938762f3989070/ShowCaseLogo.png",
  friendStatus:'Pending',
},
{
  username:"FdaTank",
  firstName:"Frank",
  lastname:"Toniski",
  profileImg:"http://localhost:5000/public/images/65970df230938762f3989070/ShowCaseLogo.png",
  friendStatus:'Accepted',
},
{
  username:"SammyBoi",
  firstName:"Sam",
  lastname:"Boneski",
  profileImg:"http://localhost:5000/public/images/65970df230938762f3989070/ShowCaseLogo.png",
  friendStatus:'Accepted',
},
{
  username:"Rileyo",
  firstName:"Riley",
  lastname:"Oregano",
  profileImg:"http://localhost:5000/public/images/65970df230938762f3989070/ShowCaseLogo.png",
  friendStatus:'Accepted',
},
{
  username:"xX_Chang_Xx",
  firstName:"John",
  lastname:"Littleson",
  profileImg:"http://localhost:5000/public/images/65970df230938762f3989070/ShowCaseLogo.png",
  friendStatus:'Accepted',
},
{
  username:"Meanie",
  firstName:"Tommy",
  lastname:"Lagru",
  profileImg:"http://localhost:5000/public/images/65970df230938762f3989070/ShowCaseLogo.png",
  friendStatus:'Blocked',
}
]
const PendingFriends = fakefriends.filter(e=>(e.friendStatus =="Pending"))
console.log('PendingFriends: ', PendingFriends)
const AcceptedFriends = fakefriends.filter(e=>(e.friendStatus =="Accepted"))
console.log('AcceptedFriends: ', AcceptedFriends)
const BlockedFriends = fakefriends.filter(e=>(e.friendStatus =="Blocked"))
console.log('BlockedFriends: ', BlockedFriends)







  return (
    <div className="friendsoutletcontainer">
      <h2>Friends</h2>
      
      
      
      
      
      <div className="friendrequests">
        <h4>Friends requests:</h4>
        <div className='requestsdiv'>
        {
        PendingFriends.map((friend, i)=>{
          return(
            <div key={i} className='pendingfriend'>
              <h4>{friend.username}</h4>
              <img src={friend.profileImg} alt='friendProfileImg'/>
              <h6>{friend.firstName}</h6>
              <h6>{friend.lastname}</h6>
              <div className='pendingfriendsbuttons'>
                <button>accept</button>
                <button>reject</button>
              </div>
            </div>
          )
        })}
      
        </div>
      </div>






      <div className="currentfriends">
        <h4>Friends:</h4>
        <div className='accepteddiv'>
        {
       AcceptedFriends.map((friend, i)=>{
          return(
            <div key={i} className='acceptedfriend'>
              <h4>{friend.username}</h4>
              <img src={friend.profileImg} alt='friendProfileImg'/>
              <h6>{friend.firstName}</h6>
              <h6>{friend.lastname}</h6>
              <div className='acceptedfriendsbuttons'>
                <button>Message</button>
                <button>Block</button>
              </div>
            </div>
          )
        })}
      
        </div>
      </div>







      <div className="blockedlist">
        <h4>Blocked People:</h4>
        <div className='blockeddiv'>
        {
      BlockedFriends.map((friend, i)=>{
          return(
            <div key={i} className='blockedfriend'>
              <h4>{friend.username}</h4>
              <img src={friend.profileImg} alt='friendProfileImg'/>
              <h6>{friend.firstName}</h6>
              <h6>{friend.lastname}</h6>
              <div className='blockedfriendsbuttons'>
                <button>Unblock</button>
              </div>
            </div>
          )
        })}
      
        </div>
      </div>
      






    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getAll: state.auth
  }
}

export default connect(mapStateToProps, null)(FriendsOutlet)