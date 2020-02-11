import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TiUserAdd } from 'react-icons/ti';

function AddContact(props) {
	let user = {};
	let firstName;
	let lastName;
	let phoneNumber;
	let email;
	let street;
	let city;
	let state;

	const [message, setMessage] = useState('');

	const history = useHistory();

	const addContact = async (event) => {
		event.preventDefault();

		console.log(localStorage.getItem('user_data'));
		if (localStorage.user_data) {
			let retrievedObject = localStorage.getItem('user_data');
			let _user = JSON.parse(retrievedObject);
			user = _user;
		}

		console.log(user.user);

		let js = `{"user":"${user.user}","first_name":"${firstName.value}","last_name":"${lastName.value}","phone_number":"${phoneNumber.value}","email":"${email.value}","street":"${street.value}","city":"${city.value}","state":"${state.value}"}`;
		// // alert('Successfully logged in!');
		console.log(js);

		try {
			const response = await fetch(
				'https://my-network-ucf.herokuapp.com/api/addcontact',
				{
					method: 'POST',
					body: js,
					headers: { 'Content-Type': 'application/json' }
				}
			);

			var res = JSON.parse(await response.text());
			console.log(res);
			if (res.error.value !== 'err') {
				setMessage('Added contact.');
				history.push('/dashboard');
			} else {
				setMessage('Could not add contact.');
			}
		} catch (e) {
			alert(e.toString());
			return;
		}
	};

	return (
		<>
			<div className="addcontact-box">
				<div className="box-header">
					<h1>Add Contact</h1>
				</div>
				{/* The two form attributes allow us to use the enter key to submit information. */}
				<form action="" method="get" onSubmit={addContact}>
					<div className="addcontact-item">
						{/* <FaUser /> */}
						<input
							type="text"
							id="firstName"
							className="input-field"
							placeholder="First Name"
							ref={(fn) => (firstName = fn)}
							required
						/>
						<br />
					</div>
					<div className="addcontact-item">
						{/* <GoKey /> */}
						<input
							type="text"
							id="lastName"
							className="input-field"
							placeholder="Last Name"
							ref={(ln) => (lastName = ln)}
							required
						/>
						<br />
					</div>
					<div className="addcontact-item">
						{/* <FaUser /> */}
						<input
							type="text"
							id="phoneNumber"
							className="input-field"
							placeholder="Phone Number"
							ref={(ph) => (phoneNumber = ph)}
							required
						/>
						<br />
					</div>
					<div className="addcontact-item">
						{/* <GoKey /> */}
						<input
							type="text"
							id="email"
							className="input-field"
							placeholder="Email"
							ref={(e) => (email = e)}
							required
						/>
						<br />
					</div>
					<div className="addcontact-item">
						{/* <FaUser /> */}
						<input
							type="text"
							id="street"
							className="input-field"
							placeholder="Street"
							ref={(st) => (street = st)}
							required
						/>
						<br />
					</div>
					<div className="addcontact-item">
						{/* <GoKey /> */}
						<input
							type="text"
							id="city"
							className="input-field"
							placeholder="City"
							ref={(c) => (city = c)}
							required
						/>
						<br />
					</div>
					<div className="addcontact-item">
						{/* <GoKey /> */}
						<input
							type="text"
							id="state"
							className="input-field"
							placeholder="State"
							ref={(s) => (state = s)}
							required
						/>
						<br />
					</div>
					<button type="submit" className="submit-button">
						<TiUserAdd />
					</button>
					<br />
					<span className="error">{message}</span>
				</form>
			</div>
		</>
	);
}

export default AddContact;
