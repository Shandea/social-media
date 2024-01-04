import './FriendsComponent.css'

import abc from "../../../../imagess/imag.jpg"
const FriendsComponent = () => {
  return (
    <div className='friendscomponentcontainer'>
        <h2>Friends</h2>
        <input placeholder='🔍Im a search box? maybe...' />
        <p>feeeed me</p>
        <div>
          <img src={abc} alt=''/>
          <h4>Social Friend</h4>
        </div>
        </div>
  )
}

export default FriendsComponent
