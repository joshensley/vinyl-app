import React from 'react';
import { useAuth } from "../../context/auth";
import classes from './Admin.module.css';

function Admin(props) {
    const { setAuthTokens } = useAuth();

    function logOut() {
        setAuthTokens();
    }

    return (
        <div>
            
            <h1 className={classes.DivElement}>
                Admin Sign Out
            </h1>
            
            <div className={classes.DivElement}>
                <button 
                    className={classes.SubmitButton}
                    onClick={logOut}
                >
                    Log Out
                </button>
            </div>
            
        </div>
    )
}

export default Admin;