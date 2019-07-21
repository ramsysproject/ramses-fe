import React from 'react';
import '../App.css';

class ProductCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleVatChange = this.handleVatChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
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

    // We will return the product to the invoker provided function
    handleSubmitClick() {
        this.props.onSubmitClick(this.state.product);
    }

    render() {
        return (
            <table class='rs-table'>
                <VatType field={"vatType"} text={"Tipo de IVA"} onVatChange={this.handleVatChange} />
                <TextInputRow field={"name"} text={"Nombre"} onInputChange={this.handleInputChange} />
                <TextInputRow field={"description"} text={"Descripcion"} onInputChange={this.handleInputChange} />
                <TextInputRow field={"status"} text={"Email"} onInputChange={this.handleInputChange} />
                <ProductSubmit text={this.props.action} onSubmitClick={this.handleSubmitClick} />
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

class ProductSubmit extends React.Component {
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

export default ProductCreateForm;