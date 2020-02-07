import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { MdDone } from 'react-icons/md'

function Register(props)
{
    const history = useHistory();

    const registerSubmit = async event =>
    {
        window.alert("Successfully created an account!");
        history.push('/')
    };

    const goBack = async event =>
    {
        history.push('/');
    }

    return(
        // React Fragment
        <>
            <div className="register-box">
                <div className="box-header">
                    <h1>Register</h1>
                    <hr />
                </div>
                {/* Once the form is submitted it will redirect back to the login page. */}
                <form action="" method="get" onSubmit={registerSubmit}>
                    <input type="text" name="fullname" className="register-field" placeholder="Full name" required/>
                    <input type="text" name="username" className="register-field" placeholder="Username" required/>
                    {/* <input type="email" name="email" className="register-field" placeholder="Email" required/> */}
                    <input type="password" name="password" className="register-field" placeholder="Password" required/>
                    <input type="password" name="confirmPassword" className="register-field" placeholder="Confirm password" required/><br />
                    {/* If user is successfully registers, notify the user. Same if it doesn't work. */}
                    <button type="submit" className="submit-button"><MdDone /></button>
                </form>
                <button className="button-link" onClick={goBack}>Go Back</button>
            </div>
        </>
    )
}

export default Register;