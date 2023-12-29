import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';

import Dev from "./dev/Dev"
import MainContainer from './pages/mainContainer/MainContainer';



import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';
import Home from './pages/home/Home';
import Body from './pages/body/Body';

import Profile from './pages/profile/Profile'
import MessagesComponent from "./pages/messagesComponent/MessagesComponent"
import HobbyComponent from "./pages/hobbyComponent/HobbyComponent";
import VideosComponent from "./pages/videosComponent/VideosComponent";
import FriendsComponent from "./pages/friendsComponent/FriendsComponent"
import ImagesComponent from "./pages/imagesComponent/ImagesComponent"
import Feed from "./pages/feedComponent/Feed"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter >
      <Routes>
        <Route path="/" element={<App />} />

        <Route element={<ProtectedRoutes />}>

          {/* all secure routes go in this section */}

          {/* <Route path="/" element={<Body />} > */}

          {/* <Route path="/home" element={<Home />} /> */}

          {/* <Route path="/main" element={<MainContainer />} />  */}

          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<MessagesComponent />} />
          <Route path="/hobby" element={<HobbyComponent />} />
          <Route path="/videos" element={<VideosComponent />} />
          <Route path="/friends" element={<FriendsComponent />} />
          <Route path="/images" element={<ImagesComponent />} />


          {/* </Route> */}




        </Route>



        <Route path="/dev" element={<Dev />} />


      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);



