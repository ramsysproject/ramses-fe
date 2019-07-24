import React from 'react';
import '../App.css';
import { TextInputRow, SubmitRow, VatType, ProductCondition, ProductType } from '../RamsesComponents.js';

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

export default ProductCreateForm;