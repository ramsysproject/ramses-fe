import React from 'react';
import '../App.css';

import ProductCreateForm from './ProductCreateForm.js';

class ProductCreateView extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleSubmitClick(product) {
        console.log(product);

        fetch('http://localhost:8090/products', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vatType: product.vatType,
            productType: product.productType,
            name: product.name,
            description: product.description,
            productOperation: product.productOperation
          })
        })
    }

    render() {
        return (
            <ProductCreateForm action="Create" onSubmitClick={this.handleSubmitClick} />
        );
    }
}

export default ProductCreateView;
