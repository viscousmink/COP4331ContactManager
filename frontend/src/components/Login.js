import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaUser, FaArrowRight } from 'react-icons/fa';
import { GoKey } from 'react-icons/go';

function Login(props) {
	let username;
	let password;

	const [message, setMessage] = useState('');

	const history = useHistory();

	const register = async (event) => {
		history.push('/register');
	};

	const login = async (event) => {
		event.preventDefault();
		let js = `{"user":"${username.value}","password":"${password.value}"}`;
		// // alert('Successfully logged in!');
		console.log(js);

		try {
			const response = await fetch('http://localhost:8000/api/login', {
				method: 'POST',
				body: js,
				headers: { 'Content-Type': 'application/json' }
			});

			var res = JSON.parse(await response.text());
			console.log(res);
			if (res.error === 'not_correct_password') {
				setMessage('Username or password is incorrect.');
			} else {
				let user = {
					user: username.value
				};
				localStorage.setItem('user_data', JSON.stringify(user));

				setMessage('');
				history.push('/dashboard');
			}
		} catch (e) {
			alert(e.toString());
			return;
		}

		// history.push('/dashboard');
	};

	return (
		<div className="login-box">
			<div className="box-header">
				<h1>MyNetwork</h1>
				<p style={{ color: 'grey' }}>Your network is your net worth.</p>
			</div>
			{/* The two form attributes allow us to use the enter key to submit information. */}
			<form action="" method="get" onSubmit={login}>
				<div className="login-item">
					<FaUser />
					<input
						type="text"
						id="username"
						className="input-field"
						placeholder="Username"
						ref={(name) => (username = name)}
						required
					/>
					<br />
				</div>
				<div className="login-item">
					<GoKey />
					<input
						type="password"
						id="password"
						className="input-field"
						placeholder="Password"
						ref={(pw) => (password = pw)}
						required
					/>
					<br />
				</div>
				<button type="submit" className="submit-button">
					<FaArrowRight />
				</button>
				<br />
				<span className="error">{message}</span>
				<br />
				<button className="button-link" onClick={register}>
					New user? Register here.
				</button>
			</form>
		</div>
	);
}

export default Login;
