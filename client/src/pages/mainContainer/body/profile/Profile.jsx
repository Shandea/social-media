import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Profile.css";
import { connect } from "react-redux";
import {
  FaCalendarPlus,
  FaCommentDots,
  FaCommentSlash,
  FaCirclePlus,
} from "react-icons/fa6";

const Profile = ({ authState }) => {
  let nav = useNavigate();
  let fakeimages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let fakegroups = [1, 2, 3, 4, 5, 6];
  let fakehobbys = [1, 2, 3, 4];





  return (
    <>
      <div className="profilecontainerdiv">
        <div className="usernameandpicdiv">
          <div className="profileimage"></div>
          <h2 className="profileHeader">{authState.user.username}</h2>
        </div>
        <div className="iconBtns">
          {/* add to friends list */}
          <button className="fontbig" title='Add Friend'>
            <FaCalendarPlus />
          </button>
          {/* msg */}
          <button className="fontbig" title='Message'>
            <FaCommentDots />
          </button>
          {/* mute? */}
          <button className="fontbig" title='Block Person'>
            <FaCommentSlash />
          </button>{" "}
        </div>
        <br />
        <br />
        <p className="bioHeader">About Me: </p>
        <div>
          /t \t /tab?!? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui fuga
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
        <br />
        <br />

        <a className="linkclass">
         <h2> Photos <FaCirclePlus className="plussign" /></h2>
        </a>
        <div className="photocontainer">
          {fakeimages.map((e) => {
            return <div className="photoelement">{e}</div>;
          })}
        </div>


        <br />
        <br />

        <a className="linkclass">
         <h2> Groups <FaCirclePlus className="plussign" /></h2>
        </a>
        <div className="groupcontainer">
          {fakegroups.map((e) => {
            return <div className="groupelement">{e}</div>;
          })}
        </div>
        <br />
        <br />

        <a className="linkclass">
          <h2>
          Hobby Projects
           <FaCirclePlus className="plussign" />
          </h2>
        </a>
        <div className="hobbycontainer">
          {fakehobbys.map((e) => {
            return <div>
                <p className='hobbytitle'>Hobby Title</p>
                  <div className="hobbyelement">  {e}
                  </div>
                    </div>;
          })}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authState: state.auth,
  };
};

export default connect(mapStateToProps, null)(Profile);
