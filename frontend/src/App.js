import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import LoginPage from './pages/LoginPage';
import AccessContactsPage from './pages/AccessContactsPage';


import './App.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/access" exact>
          <AccessContactsPage />
        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
