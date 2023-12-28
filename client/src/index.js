import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';

import Dev from "./dev/Dev"

import { BrowserRouter, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter >
      <Routes>
        <Route path="/" element={<App />} />
        {/* <App /> */}


        <Route path="/dev" element={<Dev />} />

      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);



