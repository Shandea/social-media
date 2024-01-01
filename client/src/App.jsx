import { Routes, Route }from 'react-router'

import LandingPage from "./pages/landingPage/LandingPage"

// import Dev from "./dev/Dev"
// import Home from './pages/home/Home';
// import Body from './pages/mainContainer/body/Body';

import Dev from "./dev/Register"

// import MainContainer from './pages/mainContainer/MainContainer';

import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';
import Profile from './pages/mainContainer/body/profile/Profile'
import MessagesComponent from "./pages/mainContainer/body/messages/MessagesComponent"
import HobbyComponent from "./pages/mainContainer/body/hobby/HobbyComponent";
import VideosComponent from "./pages/mainContainer/body/videos/VideosComponent";
import FriendsComponent from "./pages/mainContainer/body/friendsList/FriendsComponent"
import ImagesComponent from "./pages/mainContainer/body/images/ImagesComponent"
import Feed from "./pages/mainContainer/body/feed/Feed"

const App = () => {
  return (
    <>
      <Routes>

        <Route path="/" element={<LandingPage />} />

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


{/*  Below this line for non production sandbox links */}


        <Route path="/dev" element={<Dev />} />


      </Routes>

      {/* <Dev /> */}
    </>
  )
}

export default App