import React from 'react';
import './App.css';
import CustomerUpdateForm from'./CustomerUpdateForm.js';

class CustomerUpdateView extends React.Component {
    constructor(props) {
        super(props);
    }

    // This function handles the submit click in the form
    handleSubmitClick(customer) {
        this.setState({
            customerId: customer.id
        });
        fetch('http://localhost:8090/customers/' + customer.id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: customer.id,
            name: customer.name,
            lastName: customer.lastName,
            email: customer.email,
            city: customer.city,
            deliveryAddress: customer.deliveryAddress,
            phone: customer.phone,
            street: customer.street,
            streetNumber: customer.streetNumber,
            neighbourhood: customer.neighbourhood,
            fiscalNumber: customer.fiscalNumber,
            account: customer.account,
            accountDays: customer.accountDays,
            accountAmount: customer.accountAmount,
            vatCondition: customer.vatCondition,
            enabled: customer.enabled
          })
        })
    }

    render() {
        return (
            <CustomerUpdateForm action="Update" onSubmitClick={this.handleSubmitClick} customerId={this.state.customerId} />
        );
    }
}

export default CustomerUpdateView;
