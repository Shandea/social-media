import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';


import store from './config/redux/Store'

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
// import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';
// import Home from './pages/home/Home';
// import Body from './pages/body/Body';

// import Profile from './pages/profile/Profile'
// import MessagesComponent from "./pages/messagesComponent/MessagesComponent"
// import HobbyComponent from "./pages/hobbyComponent/HobbyComponent";
// import VideosComponent from "./pages/videosComponent/VideosComponent";
// import FriendsComponent from "./pages/friendsComponent/FriendsComponent"
// import ImagesComponent from "./pages/imagesComponent/ImagesComponent"
// import Feed from "./pages/body/feedComponents/Feed"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>

    <BrowserRouter >
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>

  </>
);



