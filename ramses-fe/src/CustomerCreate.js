import React from 'react';
import './App.css';

import CustomerCreateForm from './CustomerCreateForm.js';

class CustomerCreateView extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleSubmitClick(customer) {
        console.log(customer);

        fetch('http://localhost:8090/customers', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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
            accountDays: customer.accountDays,
            accountAmount: customer.accountAmount,
            vatCondition: customer.vatCondition
          })
        })
    }

    render() {
        return (
            <CustomerCreateForm action="Create" onSubmitClick={this.handleSubmitClick} />
        );
    }
}

export default CustomerCreateView;
