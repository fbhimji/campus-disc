import React from 'react'
import {useState} from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from "../firebase-config"

function Login() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user);
        } catch (error) {
            alert(error.message);
        }
    }

    const login = async () => {

    }

    const logout = async () => {

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
                <button> Login</button>
            </div>

            <h4> User Logged In: </h4>

            <button> Sign Out </button>
        </div>
    );
}

export default Login;