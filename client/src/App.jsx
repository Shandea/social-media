import { Routes, Route } from 'react-router'

import LandingPage from "./pages/landingPage/LandingPage"

// import Dev from "./dev/Dev"
// import Home from './pages/home/Home';
// import Body from './pages/mainContainer/body/Body';

import Dev from "./dev/FriendsComponent"
import ImageUpload from "./dev/ImageUpload"
// import MainContainer from './pages/mainContainer/MainContainer';

import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';
import Profile from './pages/mainContainer/body/profile/Profile'
import ViewProfile from './pages/mainContainer/body/profile/viewProfile/ViewProfile';
import MessagesComponent from "./pages/mainContainer/body/messages/MessagesComponent"
import HobbyComponent from "./pages/mainContainer/body/hobby/HobbyComponent";
import VideosComponent from "./pages/mainContainer/body/videos/VideosComponent";
import FriendsComponent from "./pages/mainContainer/body/friendsList/FriendsComponent"
import ImagesComponent from "./pages/mainContainer/body/images/ImagesComponent"
import FeedView from "./pages/mainContainer/body/feed/FeedView"
import ProfileTest from "./dev/Profile"
import NotificationView from "./pages/mainContainer/body/notification/NotificationView"
import FriendsOutlet from './pages/mainContainer/body/friendsOutlet/FriendsOutlet';

import FriendSearch from "./components/friends/friendSearch/FriendSearch"

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

          <Route path="/feed" element={<FeedView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<ViewProfile />} />
          <Route path="/messages" element={<MessagesComponent />} />
          <Route path="/messages/:id" element={<MessagesComponent />} />
          <Route path="/hobby" element={<HobbyComponent />} />
          <Route path="/videos" element={<VideosComponent />} />
          <Route path="/friends" element={<FriendsOutlet />} />
          <Route path="/images" element={<ImagesComponent />} />
          <Route path="/notification" element={<NotificationView />} />
          <Route path="/FriendSearch" element={<FriendSearch />} />

          {/* </Route> */}


          {/* <Route path="/feedtest" element={<AddFeed />} /> */}


        </Route>


        {/*  Below this line for non production sandbox links */}


        <Route path="/dev" element={<Dev />} />
        <Route path="/ImageUpload" element={<ImageUpload />} />
        <Route path="/profiletest" element={<ProfileTest />} />


      </Routes>

      {/* <Dev /> */}
    </>
  )
}

export default App