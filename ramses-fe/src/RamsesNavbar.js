import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class NavigationBar extends React.Component {

    render() {
        return (
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="/">RAMSES</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#home">Inicio</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>

                  <NavDropdown title="Clientes" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                        <Link to="/customerCreate/">CreateCustomer</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        <Link to="/customerEdit/">EditCustomer</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Baja</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        <Link to="/customerList/">Listado de clientes</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                    <NavDropdown title="Productos" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">
                          <Link to="/productCreate/">Crear producto</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                          <Link to="/productEdit/">Editar producto</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                          <Link to="/productList/">Listado de productos</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                          <Link to="/productTypeCreate/">Crear tipo de producto</Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Navbar.Collapse>
            </Navbar>
            );
    }
}

export default NavigationBar;
