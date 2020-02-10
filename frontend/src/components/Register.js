import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MdDone } from 'react-icons/md';

function Register(props) {
	let username;
	let password;
	let confirmPassword;

	const [message, setMessage] = useState('');
	const history = useHistory();

	const registerSubmit = async (event) => {
		event.preventDefault();

		// Making sure passwords match.
		if (password.value !== confirmPassword.value) {
			setMessage('Passwords do not match.');
			return;
		}

		let js = `{"user":"${username.value}","password":"${password.value}"}`;
		console.log(js);

		try {
			const response = await fetch('http://localhost:8000/api/createuser', {
				method: 'POST',
				body: js,
				headers: { 'Content-Type': 'application/json' }
			});

			let res = JSON.parse(await response.text());

			if (res.error.length > 0) {
				setMessage(`API Error: ${res.error}`);
			} else {
				setMessage('User has been created.');
			}
		} catch (e) {
			alert(e.toString());
			return;
		}

		// window.alert('Successfully created an account!');
		// history.push('/');
	};

	const goBack = async (event) => {
		history.push('/');
	};

	return (
		// React Fragment
		<>
			<div className="register-box">
				<div className="box-header">
					<h1>Register</h1>
				</div>
				{/* Once the form is submitted it will redirect back to the login page. */}
				<form action="" method="get" onSubmit={registerSubmit}>
					<input
						type="text"
						id="username"
						className="register-field"
						placeholder="Username"
						ref={(name) => (username = name)}
						required
					/>
					{/* <input type="email" name="email" className="register-field" placeholder="Email" required/> */}
					<input
						type="password"
						id="password"
						className="register-field"
						placeholder="Password"
						ref={(pw) => (password = pw)}
						required
					/>
					<input
						type="password"
						id="confirmPassword"
						className="register-field"
						placeholder="Confirm password"
						ref={(confirmPw) => (confirmPassword = confirmPw)}
						required
					/>
					<br />
					{/* If user is successfully registers, notify the user. Same if it doesn't work. */}
					<span>{message}</span>
					<br />
					<button type="submit" className="submit-button">
						<MdDone />
					</button>
				</form>
				<button className="button-link" onClick={goBack}>
					Go Back
				</button>
			</div>
		</>
	);
}

export default Register;
