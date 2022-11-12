import React from 'react'
import {auth, provider} from '../firebase-config'

function Login() {
    const signInWithEmail = () => {

    }
    return(
        <div className="loginPage">
            <p> Login with Email </p>

            <div>
                <h3> Register User </h3>
                <input placeholder="Email..."/>
                <input placeholder="Password..."/>
                <button> Create User</button>
            </div>

            <div>
                <h3> Login </h3>
                <input placeholder="Email..."/>
                <input placeholder="Password..."/>
                <button> Login</button>
            </div>

            <h4> User Logged In: </h4>

            <button> Sign Out </button>
        </div>
    );
}

export default Login;