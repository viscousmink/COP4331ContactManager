import React from 'react';

function LoggedInName(props)
{
    var user={}

    // Check for user
    if (localStorage.user_data)
    {
        var retrievedObject = localStorage.getItem('user_data');
        var _user = JSON.parse(retrievedObject);
        user = _user
    }

    const doLogout = event =>
    {
        event.preventDefault();
        window.location.href = '/';
    }

    return(
        <div>
            <span>Logged in as {user.firstName} {user.lastName}</span><br />
            <button type="button" class="buttons" onClick={doLogout}>Log Out</button>
        </div>
    );
};

export default LoggedInName;