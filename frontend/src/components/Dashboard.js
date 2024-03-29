import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

function Dashboard(props) {
	const history = useHistory();

	let user = {};
	let search;

	let contactStrings = [];

	const [contacts, setContacts, message, setMessage] = useState([]);
	// this hook will run once on render
	useEffect(() => {
		getContacts();
	}, []);

	const addContact = async (event) => {
		history.push('/addcontact');
	};

	async function getContacts() {
		// making api call to get contacts
		if (localStorage.user_data) {
			let retrievedObject = localStorage.getItem('user_data');
			let _user = JSON.parse(retrievedObject);
			user = _user;
		}

		let js = `{"user":"${user.user}"}`;
		const response = await fetch(
			'https://my-network-ucf.herokuapp.com/api/allcontacts',
			{
				method: 'POST',
				body: js,
				headers: { 'Content-Type': 'application/json' }
			}
		);

		let res = JSON.parse(await response.text());
		let contactList = res.results;

		for (let i = 0; i < contactList.length; i++) {
			contactStrings.push(
				`${contactList[i].first_name} ${contactList[i].last_name}`
			);
		}

		console.log(contactStrings);

		setContacts(contactStrings);
	}

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

			// let res = JSON.parse(await response.text());

			// console.log(res);

			/* let txt = await response.text();
	 		let res = JSON.parse(txt);
	 		let _results = res.results;
	 		var resultText = '';
	 		for (var i = 0; i < _results.length; i++) {
	 			resultText += _results[i];
	 			if (i < _results.length - 1) {
	 				resultText += ', ';
	 			}
	 		}
	 		setContacts(resultText);

	// 		useEffect(() => {
	// 			getContacts();
	// 		});

	 for (let i = 0; i < _results.length; i++) {
	 	contacts.push(`${_results[i].first_name} ${_results[i].last_name}`);
	 		 	if (search.value === '') {
	 		 		setMessage('');
	 		 	} else {
	 		 		setMessage(contacts);
	 		 	}
	 		 	console.log(contacts[i]);
	 		 }

	 		 if (search.value === '') {
	 		 	setMessage('');
	 		 } else {
	 		 	setMessage(`Found ${_results[0].first_name}`);
	 		 }
	 	} catch (e) {} */
			let res = JSON.parse(await response.text());
			let contactList = res.results;

			for (let i = 0; i < contactList.length; i++) {
				contactStrings.push(
					`${contactList[i].first_name} ${contactList[i].last_name}`
				);
			}
			localStorage.setItem('contact_data', JSON.stringify(contactList[0]));

			console.log(contactStrings);

			setContacts(contactStrings);
		} catch (err) {}

		// 	// User.user will allow us to get the user name.
	};

	const goToContact = async (event) => {
		//localStorage.setItem('contact_data', JSON.stringify(event));
		console.log(localStorage.getItem('contact_data'));
		// history.push('/contactcard');
	};

	const logout = async (event) => {
		// window.alert("You have successfully logged out!");
		history.push('/');
	};

	const contactDisplay = async (event) => {
		//localStorage.setItem('contact_data', JSON.stringify(event));
		console.log(localStorage.getItem('contact_data'));
		history.push('/contactcard');
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
				{/* <button onClick={contactDisplay}></button> */}
				{}
				<br />
				<div className="contact-list-box">
					<div className="conact-list">
						{contacts.map((name, index) => {
							return (
								<button
									key={index}
									className="contact"
									onClick={contactDisplay}>
									{name}
								</button>
							);
						})}
					</div>
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
// import React from 'react';

// class Card extends React.Component {
// 	render() {
// 		return (
// 			<>
// 				<div>
// 					<p>Hello</p>
// 				</div>
// 			</>
// 		);
// 	}
// }

// export default Card;
