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

		// history.push('/dashboard');
		if (localStorage.user_data) {
			let retrievedObject = localStorage.getItem('user_data');
			let _user = JSON.parse(retrievedObject);
			user = _user;
		}

		let js = `{"user":"${user.user}", "first_name":"${_contact.first_name}", "last_name":"${_contact.last_name}", "phone_number":"${_contact.phone_number}", "email":"${_contact.email}", "street":"${_contact.street}", "city":"${_contact.state}"}`;
		console.log(js);
		const response = await fetch(
			'https://my-network-ucf.herokuapp.com/api/deletecontact',
			{
				method: 'DELETE',
				body: js,
				headers: { 'Content-Type': 'application/json' }
			}
		);
		history.push('/dashboard');
	};

	const goBack = async (event) => {
		history.push('/dashboard');
	};

	return (
		<>
			<div className="contact-card-box">
				<div className="box-header">
					<h1>Contact</h1>
					<h4>Name</h4>
					<p>{name}</p>
					<h4>Phone Number</h4>
					<p>{phone}</p>
					<h4>Email</h4>
					<p>{email}</p>
					<h4>Address</h4>
					<p>{address}</p>
					<h4>City</h4>
					<p>{city}</p>
					<h4>State</h4>
					<p>{state}</p>
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
