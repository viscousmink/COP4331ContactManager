import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TiUserAdd } from 'react-icons/ti';

function Modify(props) {
	const history = useHistory();
	let user = {};
	let firstName;
	let lastName;
	let phoneNumber;
	let email;
	let street;
	let city;
	let state;

	const [message, setMessage] = useState('');

	const updateContact = async (event) => {
		event.preventDefault();

		console.log(localStorage.getItem('user_data'));
		if (localStorage.user_data) {
			let retrievedObject = localStorage.getItem('user_data');
			let _user = JSON.parse(retrievedObject);
			user = _user;
		}
		let _contact = '';
		if (localStorage.contact) {
			let retrieved = localStorage.getItem('contact');
			let _contact = JSON.parse(retrieved);
			let name = _contact.first_name + _contact.last_name;
			let address = _contact.street;
			let phone = _contact.phone_number;
			let city = _contact.city;
			let state = _contact.state;
			let email = _contact.email;
		}
		let jsUpdate = `{"user":"${user.user}", "first_name":"${_contact.first_name}", "last_name":"${_contact.last_name}", "phone_number":"${_contact.phone_number}", "email":"${_contact.email}", "street":"${_contact.street}", "city":"${_contact.state}"}`;

		console.log(user.user);

		let js = `{"user":"${user.user}","first_name":"${firstName.value}","last_name":"${lastName.value}","phone_number":"${phoneNumber.value}","email":"${email.value}","street":"${street.value}","city":"${city.value}","state":"${state.value}"}`;
		// // alert('Successfully logged in!');
		console.log(js);

		try {
			const response = await fetch(
				'https://my-network-ucf.herokuapp.com/api/updatecontact',
				{
					method: 'POST',
					body: { filter: js, update: jsUpdate },
					headers: { 'Content-Type': 'application/json' }
				}
			);

			var res = JSON.parse(await response.text());
			console.log(res);
			if (res.error.value !== 'err') {
				setMessage('Updated contact.');
				history.push('/dashboard');
			} else {
				setMessage('Could not update contact.');
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
					<h1>Update Contact</h1>
				</div>
				{/* The two form attributes allow us to use the enter key to submit information. */}
				<form action="" method="get" onSubmit={updateContact}>
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

export default Modify;
