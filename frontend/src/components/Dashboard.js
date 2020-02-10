import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

function Dashboard(props) {
	const history = useHistory();

	let user = {};

	const [searchResults, setResults] = useState('');
	const [contactList, setContactList] = useState('');

	const getContactList = async (event) => {
		event.preventDefault();

		console.log(localStorage.getItem('user_date'));
		if (localStorage.user_data) {
			let retrievedObject = localStorage.getItem('user_data');
			let _user = JSON.parse(retrievedObject);
			user = _user;
		}

		let js = `{"user":"${user.user}"}`;
		// console.log(js);

		try {
			const response = await fetch('http://localhost:8000/api/allcontacts', {
				method: 'POST',
				body: js,
				headers: { 'Content-Type': 'application/json' }
			});

			let res = JSON.parse(await response.text());

			console.log(res);
			// let _results = res.results;

			// let resultText = '';

			// for (let i = 0; i < _results.length; i++) {
			// 	resultText += _results[i];

			// 	if (i < _results.length - 1) {
			// 		resultText += ', ';
			// 	}
			// }

			// setResults('Contacts have been retrieved.');
			// setContactList(resultText);
		} catch (e) {
			alert(e.toString());
			setResults(e.toString());
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
				<FaSearch />
				<input
					type="search"
					placeholder="Search..."
					className="input-field search-bar"
				/>
				<div className="dashboard-contact">
					<div className="contact-list">
						Contact List
						<hr />
						<button onClick={getContactList}></button>
					</div>
					<div className="contact-info">
						{/* I believe we're gonna have to use a span to show the information of each contact. */}
						Contact Information
						<hr />
						<p>
							Name: Jeff Bezos
							<br />
							Phone: XXX-XXX-XXXX
							<br />
							Email: jbezos@amazon.com
							<br />
						</p>
					</div>
				</div>
				<button className="submit-button" onClick={logout}>
					<IoIosLogOut />
				</button>
			</div>
		</>
	);
}

export default Dashboard;
