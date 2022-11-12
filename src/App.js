import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from  'react-router-dom';
import {useState} from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import logout from "./pages/Login";
import CreateEvent from "./pages/CreateEvent"

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  return (
    <Router>
      <nav>
        <Link to={"/"}> Home </Link>
        <Link to={"/create-event"}> Create Event </Link>
        {!isAuth ? <Link to={"/login"}> Login </Link> : <button onClick={logout}> Log Out </button>}
      </nav>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
