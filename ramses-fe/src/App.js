import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import CustomerList from './CustomerList.js';
import CustomerUpdateView from './CustomerUpdate.js';
import CustomerCreateView from './CustomerCreate.js';
import NavigationBar from './RamsesNavbar.js';

class App extends React.Component {
  render() {
    return (
        <div className="App">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />

        <Router>
            <Route path="/" component={NavigationBar} />
            <Route path="/customerCreate/" component={CustomerCreateView} />
            <Route path="/customerEdit/" component={CustomerUpdateView} />
            <Route path="/customerList/" component={CustomerList} />
        </Router>

      </div>
    );
  }
}

export default App;
