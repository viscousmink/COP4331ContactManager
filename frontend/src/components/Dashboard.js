import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

function Dashboard(props) {
	const history = useHistory();

	let user = {};
	let search;

	const contacts = [];

	const [message, setMessage] = useState('');

	const addContact = async (event) => {
		history.push('/addcontact');
	};

	const searchContactList = async (event) => {
		event.preventDefault();

		if (localStorage.user_data) {
			let retrievedObject = localStorage.getItem('user_data');
			let _user = JSON.parse(retrievedObject);
			user = _user;
		}

		let js = `{"user":"${user.user}","search":"${search.value}"}`;

		try {
			const response = await fetch(
				'https://my-network-ucf.herokuapp.com/api/searchcontact',
				{
					method: 'POST',
					body: js,
					headers: { 'Content-Type': 'application/json' }
				}
			);

			let res = JSON.parse(await response.text());

			console.log(res);

			let _results = res.results;

			for (let i = 0; i < _results.length; i++) {
				contacts.push(`${_results[i].first_name} ${_results[i].last_name}`);
				if (search.value === '') {
					setMessage('');
				} else {
					setMessage(contacts);
				}
				console.log(contacts[i]);
			}

			// if (search.value === '') {
			// 	setMessage('');
			// } else {
			// 	setMessage(`Found ${_results[0].first_name}`);
			// }
		} catch (e) {}

		// User.user will allow us to get the user name.
	};

	const getContactList = async (event) => {
		event.preventDefault();

		console.log(localStorage.getItem('user_data'));
		if (localStorage.user_data) {
			let retrievedObject = localStorage.getItem('user_data');
			let _user = JSON.parse(retrievedObject);
			user = _user;
		}

		let js = `{"user":"${user.user}"}`;
		// console.log(js);

		try {
			const response = await fetch(
				'https://my-network-ucf.herokuapp.com/api/allcontacts',
				{
					method: 'POST',
					body: js,
					headers: { 'Content-Type': 'application/json' }
				}
			);

			let res = JSON.parse(await response.text());

			// Code to access first name of contacts
			console.log(res.results[0].first_name);
			let _results = res.results;
		} catch (e) {
			alert(e.toString());
		}
	};

	const logout = async (event) => {
		// window.alert("You have successfully logged out!");
		history.push('/');
	};

	return (
		<>
			<div className="dashboard-box">
				<div className="box-header">
					<h1>Dashboard</h1>
				</div>
				<input
					type="search"
					id="searchText"
					placeholder="Search contacts..."
					className="input-field search-bar"
					onChange={searchContactList}
					ref={(contact) => (search = contact)}
				/>
				<FaSearch />
				{/* <button onClick={getContactList}></button> */}
				{}
				<br />
				<div>
					{/* {contacts.map((contact, list) => (
						<div>
							<p key={list}>
								{contact.first_name} {contact.last_name}
							</p>
						</div>
					))} */}
					{message}
				</div>
				<button className="addContact" onClick={addContact}>
					Add Contact
				</button>
				<br />
				<button className="submit-button" onClick={logout}>
					<IoIosLogOut />
				</button>
			</div>
		</>
	);
}

export default Dashboard;
