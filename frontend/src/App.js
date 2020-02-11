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
				<Route path="/dashboard">
					<DashboardPage />
				</Route>
				<Route path="/addcontact">
					<AddContactPage />
				</Route>
				<Redirect to="/" />
			</Switch>
		</Router>
	);
}

export default App;
