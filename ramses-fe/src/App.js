import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

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


        <NavigationBar />
        <Clock />
        <PersonForm />
      </div>
    );
  }
}

class NavigationBar extends React.Component {

    render() {
        return (
            <Navbar bg="primary" variant="dark" expand="lg">
              <Navbar.Brand href="#home">RAMSES</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#home">Inicio</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown title="Clientes" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Alta</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Modification</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Baja</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
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

class PersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            province: null
        };
        this.handleProvinceChange = this.handleProvinceChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleVatChange = this.handleVatChange.bind(this);
    }

    handleProvinceChange(newProvince) {
        this.setState({
            province: newProvince
        });
    }

    handleCityChange(newCity) {
        this.setState({
            city: newCity
        });
    }

    handleInputChange(key, value) {
        this.setState({
            [key]: value
        });
    }

    handleVatChange(newVat) {
        this.setState({
            vatCondition: newVat
        });
    }

    handleSubmitClick() {
        console.log(this.state);

        fetch('http://localhost:8090/customers', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.name,
            lastName: this.state.lastName,
            email: this.state.email,
            city: this.state.city,
            deliveryAddress: this.state.deliveryAddress,
            phone: this.state.phone,
            street: this.state.street,
            streetNumber: this.state.streetNumber,
            neighbourhood: this.state.neighbourhood,
            fiscalNumber: this.state.fiscalNumber,
            accountDays: this.state.accountDays,
            accountAmount: this.state.accountAmount,
            vatCondition: this.state.vatCondition
          })
        })
    }

    render() {
        return (
            <table class='rs-table'>
                <TextInputRow field={"name"} text={"Nombre"} onInputChange={this.handleInputChange} />
                <TextInputRow field={"lastName"} text={"Apellido"} onInputChange={this.handleInputChange} />
                <TextInputRow field={"email"} text={"Email"} onInputChange={this.handleInputChange} />
                <TextInputRow field={"deliveryAddress"} text={"Direccion de envio"} onInputChange={this.handleInputChange} />
                <TextInputRow field={"phone"} text={"Telefono"} onInputChange={this.handleInputChange} />
                <TextInputRow field={"street"} text={"Calle"} onInputChange={this.handleInputChange} />
                <TextInputRow field={"streetNumber"} text={"Numero"} onInputChange={this.handleInputChange} />
                <VatCondition field={"vatCondition"} text={"Condicion fiscal"} onVatChange={this.handleVatChange} />
                <TextInputRow field={"neighbourhood"} text={"Barrio"} onInputChange={this.handleInputChange} />
                <TextInputRow field={"fiscalNumber"} text={"Numero fiscal"} onInputChange={this.handleInputChange} />
                <TextInputRow field={"accountDays"} text={"Dias en CC"} onInputChange={this.handleInputChange} />
                <TextInputRow field={"accountAmount"} text={"Monto en CC"} onInputChange={this.handleInputChange} />
                <ProvinceRow field={"province"} text={"Provincia"} onProvinceChange={this.handleProvinceChange} />
                <CityRow field={"city"} text={"Ciudad"} onCityChange={this.handleCityChange} province={this.state.province} />
                <PersonSubmit text={"Registrar"} onSubmitClick={this.handleSubmitClick} />
            </table>
        );
    }
}

class VatCondition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            vat: null
        };
        this.handleVatChange = this.handleVatChange.bind(this);
    }

    handleVatChange(e) {
        this.props.onVatChange(e.target.value);
    }

    componentDidMount() {
        fetch("http://localhost:8090/vat-conditions")
            .then(res => res.json() )
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <tr>
                    <td><p>{this.props.text}</p></td>
                    <td>
                        <select onChange={this.handleVatChange} >
                            {items.map(item => (
                                <option value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </td>
                </tr>
            );
        }
    }
}

class PersonSubmit extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleSubmitClick() {
        this.props.onSubmitClick();
    }

    render() {
        return(
            <tr>
                <td colspan="2">
                    <button onClick={this.handleSubmitClick}>
                        {this.props.text}
                    </button>
                </td>
            </tr>
        );
    }
}

class ProvinceRow extends React.Component {
    render() {
        return(
            <tr>
                <td><p>{this.props.text}</p></td>
                <td><Province isEnabled={true} onProvinceChange={this.props.onProvinceChange} /></td>
            </tr>
        );
    }
}

class Province extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            province: null
        };
        this.handleProvinceChange = this.handleProvinceChange.bind(this);
    }

    handleProvinceChange(e) {
        this.props.onProvinceChange(e.target.value);
    }

    componentDidMount() {
        fetch("http://localhost:8090/provinces")
            .then(res => res.json() )
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <select onChange={this.handleProvinceChange} >
                    {items.map(item => (
                        <option value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            );
        }
    }
}

class CityRow extends React.Component {
    render() {
        return(
            <tr>
                <td><p>{this.props.text}</p></td>
                <td><City isEnabled={true} province={this.props.province} onCityChange={this.props.onCityChange} /></td>
            </tr>
        );
    }
}

class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            city: null
        };
        this.handleCityChange = this.handleCityChange.bind(this);
    }

    handleCityChange(e) {
        this.props.onCityChange(e.target.value);
    }

    componentDidUpdate(prevProps) {
      // Uso tipico (no olvides de comparar los props):
      if (this.props.province !== prevProps.province) {
        this.fetchData(this.props.userID);
      }
    }

    fetchData() {
        if (this.props.province === null) {
            return null;
        }

        fetch("http://localhost:8090/cities/province/" + this.props.province)
            .then(res => res.json() )
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            if(this.state.city !== null) {
                return <div>Loading...</div>;
            } else {
                return <div><p>Seleccione una provincia</p></div>
            }
        } else {
            return (
                <select onChange={this.handleCityChange} >
                    {items.map(item => (
                        <option value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            );
        }
    }
}

class TextInputRow extends React.Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(e) {
        this.props.onInputChange(this.props.field, e.target.value);
    }

    render() {
        return (
            <tr>
                <td><p>{this.props.text}</p></td>
                <td><input type='text' onChange={this.handleTextChange}/></td>
            </tr>
        );
    }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div align="right" class="clock">
        <h4>It is {this.state.date.toLocaleTimeString()}</h4>
      </div>
    );
  }
}

setInterval(Clock, 1000);

export default App;
