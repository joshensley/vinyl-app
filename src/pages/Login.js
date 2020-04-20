import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from "../context/auth";
import classes from './Login.module.css';

function Login() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    function postLogin() {
        axios.get('/authUsers.json', { userName, password })
            .then(response => {
                if (response.data.username === userName &&
                    response.data.password === password) {
                    setAuthTokens(response.data);
                    setLoggedIn(true);
                } else {
                    setIsError(true);
                }
            }).catch(e => {
                setIsError(true);
            });
    }

    if (isLoggedIn) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <h1 className={classes.DivElement}>
                Admin Sign-In 
            </h1>
            <form>
                <div className={classes.DivElement}>
                    <input
                        className={classes.InputFields}
                        type="username"
                        value={userName}

                        placeholder="username"
                        onChange={e => {
                            setUserName(e.target.value);
                        }}
                    />
                    <input
                        className={classes.InputFields}
                        type="password"
                        value={password}
                        placeholder="password"
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
            </form>
            <div className={classes.DivElement}>
                <button
                    className={classes.SubmitButton}
                    onClick={postLogin}
                >
                    Sign In
                </button>
            </div>
            
            {/* <Link to="/signup">Don't have an account?</Link> */}
            <div style={{alignItems: "center", justifyContent: "center", textAlign: "center"}}>
                {
                    isError && 
                    <p>
                        The username and/or password provided was incorrect!
                    </p>}
            </div>
        </div>
    )
}

export default Login;