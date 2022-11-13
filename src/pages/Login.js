import React from 'react'
import {useState} from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth' //signOut, applyActionCode
import {auth} from "../firebase-config"
import {useNavigate} from "react-router-dom";

function Login({ setIsAuth }) {

    let navigate = useNavigate();

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            setIsAuth(true);
            alert("You have successfully registered and are logged in!");
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    }

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            alert("You have successfully logged in!");
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    }

    

    return(
        <div className="loginPage">
            <div>
                <h3> Register User </h3>
                <input placeholder="Email..." onChange={(event) => {setRegisterEmail(event.target.value)}}/>
                <br></br>
                <input placeholder="Password..." onChange={(event) => {setRegisterPassword(event.target.value)}}/>
                <br></br>
                <button onClick={register}> Create User</button>
            </div>

            <div>
                <h3> Login </h3>
                <input placeholder="Email..." onChange={(event) => {setLoginEmail(event.target.value)}}/>
                <br></br>
                <input placeholder="Password..." onChange={(event) => {setLoginPassword(event.target.value)}}/>
                <br></br>
                <button onClick={login}> Login</button>
            </div>

            <h4> {user ? "Logged In As:" : "Not Logged in"} </h4>
            {user ? user.email : ""}
        </div>
    );
}

export default Login;