import React from 'react';
import '../App.css';
import ProductUpdateForm from'./ProductUpdateForm.js';

class ProductUpdateView extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    // This function handles the submit click in the form
    handleSubmitClick(product) {
        fetch('http://localhost:8090/products/' + product.id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: product.id,
            vatType: product.vatType,
            productType: product.productType,
            name: product.name,
            description: product.description,
            productOperation: product.productOperation,
            status: product.status
          })
        });

        this.props.history.push('/productList');
    }

    render() {
        return (
            <ProductUpdateForm action="Update" onSubmitClick={this.handleSubmitClick} />
        );
    }
}

export default ProductUpdateView;
