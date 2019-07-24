import React from 'react';

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
                <td><input type='text' onChange={this.handleTextChange} value={this.props.preload}
                    disabled={this.props.disabled} /></td>
            </tr>
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
                        <select onChange={this.handleChange} value={this.props.preload} >
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
                        <select onChange={this.handleChange} value={this.props.preload} >
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

class SubmitRow extends React.Component {
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

class CheckboxInputRow extends React.Component {
    constructor(props) {
        super(props);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(e) {
        let active = !this.props.preload;
        this.props.onInputChange(this.props.field, active);
    }

    render() {
        return (
            <tr>
                <td><p>{this.props.text}</p></td>
                <td>
                    <input type='checkbox' onChange={this.handleCheckboxChange} checked={this.props.preload===true} />
                </td>
            </tr>
        );
    }
}

export {
    TextInputRow,
    SubmitRow,
    VatType,
    ProductCondition,
    ProductType,
    CheckboxInputRow
}