import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class CustomerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8090/customers", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
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
        if (this.state.items.length === 0) {
            return (
                <h2>No hay clientes disponibles</h2>
            );
        } else {
            return (
                <table class='rs-table'>
                    {items.map(item => (
                        <tr className={"rs-table-row " + (item.enabled ? "row-enabled" : 'row-disabled')}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.lastName}</td>
                            <td>{item.deliveryAddress}</td>
                            <td>{item.provinceName}</td>
                            <td>{item.cityName}</td>
                            <td><a href={"/customerEdit?customerId=" + item.id}>Editar</a></td>
                        </tr>
                    ))}
                </table>
            );
        }
    }
}

export default CustomerList;
