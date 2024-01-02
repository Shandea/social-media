import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Profile.css";
import axios from "axios";
import { connect } from "react-redux";
// import { getCreateAcct } from "../../../config/redux/actions/AuthActions"
import { getCreateAcct } from "../../../../config/redux/actions/AuthActions";
import { FaCalendarPlus, FaCommentDots, FaCommentSlash } from "react-icons/fa6";

const Profile = ({ authState }) => {
  let nav = useNavigate();
  console.log("authState: ", authState);
  // console.log('authState.user: ', authState.authState.user)

  return (
    <>
      <div className="profilecontainerdiv">
        <h2 className="profileHeader">{authState.user.username}</h2>
        <div className="iconBtns">
        
          {/* add to friends list */}
          <button>
            <FaCalendarPlus />
          </button>
          {/* msg */}
          <button>
            <FaCommentDots />
          </button>
          {/* mute? */}
          <button>
            <FaCommentSlash />
          </button>{" "}
        </div>
        <br/>
        <br/>
        <div>profile pic goes here</div>
        <br />
        <br />
        <p className='bioHeader'>bio</p>
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui fuga
          delectus consequatur officiis animi et, impedit porro reprehenderit
          laborum, sed ea expedita alias. Dolorem porro sint est corrupti
          temporibus eius cupiditate consectetur molestiae voluptatem
          consequuntur. Id quo deserunt hic. In, iusto corporis blanditiis
          deserunt eligendi quo! Deleniti quidem in itaque vel delectus omnis
          iure possimus quaerat quas adipisci ipsum dolores, accusantium ea quis
          at illo. Ipsa, et. Impedit sit alias sunt, soluta dolorem aliquid
          error dicta repellendus consectetur, ducimus, veniam debitis?
          Voluptatum distinctio perferendis eos incidunt provident doloribus,
          cum earum et illo ipsa porro magni itaque ex corporis libero, impedit
          eveniet tenetur nobis aspernatur? Expedita similique esse, blanditiis
          sint voluptatum at. Odit quo rem iste architecto, recusandae quis,
          inventore similique possimus illum at sed, ex beatae facere
          accusantium neque a ratione modi consequuntur repudiandae
          necessitatibus illo odio minima quibusdam. Quos quis veritatis
          nesciunt. Modi voluptate eligendi itaque? Recusandae earum velit
          aperiam, magnam, hic quibusdam dignissimos quas officiis ab fugiat
          voluptates aliquid assumenda rem itaque optio repudiandae! Mollitia
          placeat dignissimos eius? Quos amet fugiat quae beatae consectetur
          unde vitae voluptas, voluptates ipsa mollitia quasi aliquid nulla
          voluptatum nam asperiores numquam? Iure possimus deleniti cumque
          voluptates consequatur saepe, laborum ratione recusandae nihil!
        </div>
        <br/>
        <br/>
        <a className='linkclass'>Photos</a>
        <br/>
        <br/>
        <a className='linkclass'>Hobby Projects</a>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authState: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //   getCreateAcct: () => dispatch(getCreateAcct())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
