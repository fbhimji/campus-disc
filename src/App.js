import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from  'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateEvent from "./pages/CreateEvent"

function App() {
  return (
    <Router>
      <nav>
        <Link to={"/"}> Home </Link>
        <Link to={"/create-event"}> Create Event </Link>
        <Link to={"/login"}> Login </Link>
      </nav>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
