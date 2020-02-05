import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Login(props)
{
    const history = useHistory();
    var loginName;
    var loginPassword;

    const [message, setMessage] = useState('');

    const doLogin = async event =>
    {
        // event.preventDefault();

        // var js = '{"login":"'
        //     + loginName.value
        //     + '","password:"'
        //     + loginPassword.value + '"}';

        // try
        // {
        //     const response = await fetch('http://localhost:5000/api/login',
        //         {method:'POST',body:js,header:{'Content-Type': 'application/json'}});

        //     var res = JSON.parse(await response.text());

        //     if (res.id <= 0)
        //     {
        //         setMessage('Username and or password are incorrect.');
        //     }
        //     else
        //     {
        //         var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
        //         localStorage.setItem('user_data', JSON.stringify(user));

        //         setMessage('');
        //         window.location.href = '/access';
        //     }
        // }
        // catch(e)
        // {
        //     alert(e.toString());
        //     return;
        // }
        history.push('/access');
    };

    return(
        <div>
            <Form className="login-body" onSubmit={doLogin}>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="JohnDoe123" ref={(c) => loginName = c} style={{width: "20rem"}} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={(c) => loginPassword = c} style={{width: "20rem"}} />
                </Form.Group>

                <Button variant="primary" type="submit"  style={{width: "10rem"}} onClick={doLogin}>
                    Sign In
                </Button>
                
                {/* Fix this later with custom css. */}
                {/* <Form.Text className="text-muted">
                    <a href="#">Sign up</a>
                </Form.Text> */}
            </Form>
            <span>{message}</span>
        </div>
    );
};

export default Login;