import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';

import Dev from "./dev/Dev"
import MainContainer from './pages/mainContainer/MainContainer';



import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';
import Home from './pages/home/Home';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter >
      <Routes>
        <Route path="/" element={<App />} />

        <Route element={<ProtectedRoutes />}>

          {/* all secure routes go in this section */}


          <Route path="/home" element={<Home />} />

          <Route path="/main" element={<MainContainer />} />



        </Route>



        <Route path="/dev" element={<Dev />} />


      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);



