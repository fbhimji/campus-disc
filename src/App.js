import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from  'react-router-dom';
import {useState} from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateEvent from "./pages/CreateEvent"
import EditEvent from "./pages/EditEvent"
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  
  var userEmail;
  if (auth.currentUser === null ||auth.currentUser.email === null) {
    userEmail = "";
  } else {
    userEmail = auth.currentUser.email;
  }

  const logout = async () => {
    signOut(auth).then(() => {
        localStorage.clear();
        setIsAuth(false);
        window.location.pathname = "/";
        alert("You have successfully signed out!");
    }).catch((error) => {
        alert(error);
    });
}

  return (
    <Router>
      <nav>
        <Link to={"/"}> Home </Link>
        {!isAuth ? (<Link to="/login"> Login </Link>) : (
          <>
            <Link to="/create-event"> Create Event </Link>
            <button onClick={logout}> Log Out</button>
          </>
        )}
      </nav>
        <div>
             {isAuth ? <b>&#128100;</b> : ""}
            <u> {isAuth ? userEmail : ""}
            {isAuth && userEmail === "admin@gmail.com" ? " - Admin" : ""} </u> 
        </div>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/edit-event" element={<EditEvent />}/>
      </Routes>
    </Router>
  );
}

export default App;
