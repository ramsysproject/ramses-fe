import React from 'react';
import './App.css';

class CustomerCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            province: null,
            customer: {}
        };
        this.handleProvinceChange = this.handleProvinceChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleVatChange = this.handleVatChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
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
                <CityRow field={"city"} text={"Ciudad"} onCityChange={this.handleCityChange} province={this.state.customer.province} />
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

export default CustomerCreateForm;