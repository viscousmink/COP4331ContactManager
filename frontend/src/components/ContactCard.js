import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

function ContactCard(props) {
	const history = useHistory();
	if (localStorage.contact) {
		let retrieved = localStorage.getItem('contact');
		let _contact = JSON.parse(retrievedObject);
		let name = _contact.first_name + _contact.last_name;
		let address = _contact.street;
		let phone = _contact.phone_number;
		let city = _contact.city;
		let state = _contact.state;
		let email = _contact.email;
	}
	return 
		<>
			<div className="dashboard-box">
				<div className="box-header">
					<h1>{name}</h1>
				</div>
				<br />
				<button className="submit-button" onClick={logout}>
					<IoIosLogOut />
				</button>
			</div>
		</>
}

export default ContactCard;
