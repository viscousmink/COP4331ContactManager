import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AddContactPage from './pages/AddContactPage';
import ContactCardPage from './pages/ContactCardPage';
import ModifyPage from './pages/ModifyPage';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<LoginPage />
				</Route>
				<Route path="/register">
					<RegisterPage />
				</Route>
				<Route path="/modify">
					<ModifyPage />
				</Route>
				<Route path="/dashboard">
					<DashboardPage />
				</Route>
				<Route path="/addcontact">
					<AddContactPage />
				</Route>
				<Route path="/contactcard">
					<ContactCardPage />
				</Route>
				<Route path="/modify">{/* <ModifyPage /> */}</Route>
				<Redirect to="/" />
			</Switch>
		</Router>
	);
}

export default App;
