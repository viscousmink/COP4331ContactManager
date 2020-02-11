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
				<br />
			</div>
		</>
	);
}

export default ContactCard;
