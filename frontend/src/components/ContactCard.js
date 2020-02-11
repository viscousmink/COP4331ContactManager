import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

function ContactCard(props) {
	let name;
	let address;
	let phone;
	let city;
	let state;
	let email;
	const history = useHistory();
	if (localStorage.contact) {
		let retrieved = localStorage.getItem('contact_data');
		let _contact = JSON.parse(retrieved);
		name = _contact.first_name + ' ' + _contact.last_name;
		address = _contact.street;
		phone = _contact.phone_number;
		city = _contact.city;
		state = _contact.state;
		email = _contact.email;
	}

	const modify = async (event) => {
		history.push('/modify');
	};
	const deleteFunc = async (event) => {
		let user = '';
		let retrieved = localStorage.getItem('contact_data');
		let _contact = JSON.parse(retrieved);

		history.push('/dashboard');
		if (localStorage.user_data) {
			let retrievedObject = localStorage.getItem('user_data');
			let _user = JSON.parse(retrievedObject);
			user = _user;
		}

		let js = `{"user":"${user.user}", "first_name":"${_contact.first_name}", "last_name":"${_contact.last_name}", "phone_number":"${_contact.phone_number}", "email":"${_contact.email}", "street":"${_contact.street}", "city":"${_contact.state}"}`;
		const response = await fetch(
			'https://my-network-ucf.herokuapp.com/api/deletecontact',
			{
				method: 'POST',
				body: js,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	};

	const goBack = async (event) => {
		history.push('/dashboard');
	};

	return (
		<>
			<div className="dashboard-box">
				<div className="box-header">
					<h1>Contact</h1>

					<p>
						Name: <br />
						{name}
					</p>
					<p>Phone Number: {phone}</p>
					<p>Email: {email}</p>
					<p>Address: {address}</p>
					<p>City: {city}</p>
					<p>State: {state}</p>
				</div>
				<button onClick={modify} className="contact-card-button">
					Update
				</button>
				<br />
				<button onClick={deleteFunc} className="contact-card-button">
					Delete
				</button>
				<br />
				<button onClick={goBack} className="contact-card-button">
					Go Back
				</button>
				<br />
			</div>
		</>
	);
}

export default ContactCard;
