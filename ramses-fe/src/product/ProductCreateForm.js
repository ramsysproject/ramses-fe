import React from 'react';
import '../App.css';
import { TextInputRow, SubmitRow } from '../RamsesComponents.js';

class ProductCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleVatChange = this.handleVatChange.bind(this);
        this.handleOperationChange = this.handleOperationChange.bind(this);
        this.handleProductTypeChange = this.handleProductTypeChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleInputChange(key, value) {
        this.setState({
            product: {
                  ...this.state.product,
                  [key]: value
            }
        }, console.log(this.state))
    }

    handleVatChange(newVat) {
        this.setState({
            product: {
                  ...this.state.product,
                  vatType: newVat
            }
        }, console.log(this.state))
    }

    handleOperationChange(newOperation) {
        this.setState({
            product: {
                  ...this.state.product,
                  productOperation: newOperation
            }
        }, console.log(this.state))
    }

    handleProductTypeChange(newProductType) {
        this.setState({
            product: {
                  ...this.state.product,
                  productType: newProductType
            }
        }, console.log(this.state))
    }

    // We will return the product to the invoker provided function
    handleSubmitClick() {
        this.props.onSubmitClick(this.state.product);
    }

    render() {
        return (
            <table class='rs-table'>
                <ProductCondition field={"productOperation"} text={"Destino"} onChange={this.handleOperationChange} />
                <ProductType field={"productType"} text={"Tipo de producto"} onChange={this.handleProductTypeChange} />
                <VatType field={"vatType"} text={"Tipo de IVA"} onVatChange={this.handleVatChange} />
                <TextInputRow field={"name"} text={"Nombre"} onInputChange={this.handleInputChange} />
                <TextInputRow field={"description"} text={"Descripcion"} onInputChange={this.handleInputChange} />
                <SubmitRow text={this.props.action} onSubmitClick={this.handleSubmitClick} />
            </table>
        );
    }
}

class VatType extends React.Component {
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
        fetch("http://localhost:8090/vat-types")
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

class ProductCondition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            condition: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    componentDidMount() {
        fetch("http://localhost:8090/product-operations")
            .then(res => res.json() )
            .then(
                (result) => {
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
                        <select onChange={this.handleChange} >
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

class ProductType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            condition: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    componentDidMount() {
        fetch("http://localhost:8090/product-types")
            .then(res => res.json() )
            .then(
                (result) => {
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
                        <select onChange={this.handleChange} >
                            {items.map(item => (
                                <option value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </td>
                </tr>
            );
        }
    }
}

export default ProductCreateForm;