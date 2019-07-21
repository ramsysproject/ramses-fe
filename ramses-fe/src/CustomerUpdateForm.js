import React from 'react';
import './App.css';

class CustomerUpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: {}
        }
        this.handleProvinceChange = this.handleProvinceChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleVatChange = this.handleVatChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    componentWillMount() {
        console.log("Inside componentWillMount");
        fetch("http://localhost:8090/customers/1", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(res => res.json() )
            .then(
                (result) => {
                    console.log("Este es el customer fetcheado");
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        customer: result
                    }, console.log("ve" + this.state.customer.name));
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleProvinceChange(newProvince) {
        this.setState({
            customer: {
                  ...this.state.customer,
                  province: newProvince
            }
        }, console.log(this.state))
    }

    handleCityChange(newCity) {
        this.setState({
            customer: {
                  ...this.state.customer,
                  city: newCity
            }
        }, console.log(this.state))
    }

    handleInputChange(key, value) {
        this.setState({
            customer: {
                  ...this.state.customer,
                  [key]: value
            }
        }, console.log(this.state))
    }

    handleVatChange(newVat) {
        this.setState({
            customer: {
                  ...this.state.customer,
                  vatCondition: newVat
            }
        }, console.log(this.state))
    }

    // We will return the customer to the invoker provided function
    handleSubmitClick() {
        this.props.onSubmitClick(this.state.customer);
    }

    render() {
//        console.log("Este es el customer en el update form");
//        console.log(this.state.customer);
        return (
            <table className='rs-table'>
                <TextInputRow field={"name"} text={"Nombre"} onInputChange={this.handleInputChange}
                    preload={this.state.customer.name} />
                <TextInputRow field={"lastName"} text={"Apellido"} onInputChange={this.handleInputChange}
                    preload={this.state.customer.lastName} />
                <TextInputRow field={"email"} text={"Email"} onInputChange={this.handleInputChange}
                    preload={this.state.customer.email} />
                <TextInputRow field={"deliveryAddress"} text={"Direccion de envio"} onInputChange={this.handleInputChange}
                    preload={this.state.customer.deliveryAddress} />
                <TextInputRow field={"phone"} text={"Telefono"} onInputChange={this.handleInputChange}
                    preload={this.state.customer.phone} />
                <TextInputRow field={"street"} text={"Calle"} onInputChange={this.handleInputChange}
                    preload={this.state.customer.street} />
                <TextInputRow field={"streetNumber"} text={"Numero"} onInputChange={this.handleInputChange}
                    preload={this.state.customer.streetNumber} />
                <VatCondition field={"vatCondition"} text={"Condicion fiscal"} onVatChange={this.handleVatChange}
                    preload={this.state.customer.vatCondition} />
                <TextInputRow field={"neighbourhood"} text={"Barrio"} onInputChange={this.handleInputChange}
                    preload={this.state.customer.neighbourhood} />
                <TextInputRow field={"fiscalNumber"} text={"Numero fiscal"} onInputChange={this.handleInputChange}
                    preload={this.state.customer.fiscalNumber} />
                <TextInputRow field={"accountDays"} text={"Dias en CC"} onInputChange={this.handleInputChange}
                    preload={this.state.customer.accountDays} />
                <TextInputRow field={"accountAmount"} text={"Monto en CC"} onInputChange={this.handleInputChange}
                    preload={this.state.customer.accountAmount} />
                <ProvinceRow field={"province"} text={"Provincia"} onProvinceChange={this.handleProvinceChange}
                    preload={this.state.customer.province} />
                <CityRow field={"city"} text={"Ciudad"} onCityChange={this.handleCityChange}
                    province={this.state.customer.province} preload={this.state.customer.city} />
                <PersonSubmit text={this.props.action} onSubmitClick={this.handleSubmitClick} />
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
                        <select onChange={this.handleVatChange} value={this.props.preload} >
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
                <td><Province isEnabled={true} onProvinceChange={this.props.onProvinceChange} preload={this.props.preload}/></td>
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
                <select onChange={this.handleProvinceChange} value={this.props.preload} >
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
                <td><City isEnabled={true} province={this.props.province} onCityChange={this.props.onCityChange}
                    preload={this.props.preload} /></td>
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
                <select onChange={this.handleCityChange} value={this.props.preload} >
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
                <td><input type='text' onChange={this.handleTextChange} value={this.props.preload} /></td>
            </tr>
        );
    }
}

export default CustomerUpdateForm;