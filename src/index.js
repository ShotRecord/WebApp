
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './utilities/reportWebVitals';
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from "./pages/Game/Game";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
          <main>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Game" element={<Game />} />
              </Routes>
          </main>
      </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
