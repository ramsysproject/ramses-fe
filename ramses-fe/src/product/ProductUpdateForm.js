import React from 'react';
import '../App.css';
import { TextInputRow, ProductCondition, ProductType, VatType, SubmitRow, CheckboxInputRow } from '../RamsesComponents.js';

class ProductUpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleVatChange = this.handleVatChange.bind(this);
        this.handleOperationChange = this.handleOperationChange.bind(this);
        this.handleProductTypeChange = this.handleProductTypeChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    componentWillMount() {
        let params = new URLSearchParams(window.location.search);
        let productId = params.get("productId");
        console.log("Product id is: " + productId);

        fetch("http://localhost:8090/products/" + productId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(res => res.json() )
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        product: result
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
                <TextInputRow field={"id"} text={"Id"} onInputChange={this.handleInputChange}
                    preload={this.state.product.id} disabled="true" />
                <ProductCondition field={"productOperation"} text={"Destino"} onChange={this.handleOperationChange}
                    preload={this.state.product.productOperation} />
                <ProductType field={"productType"} text={"Tipo de producto"} onChange={this.handleProductTypeChange}
                    preload={this.state.product.productType} />
                <VatType field={"vatType"} text={"Tipo de IVA"} onVatChange={this.handleVatChange}
                    preload={this.state.product.vatType} />
                <TextInputRow field={"name"} text={"Nombre"} onInputChange={this.handleInputChange}
                    preload={this.state.product.name} />
                <TextInputRow field={"description"} text={"Descripcion"} onInputChange={this.handleInputChange}
                    preload={this.state.product.description} />
                <CheckboxInputRow field={"status"} text={"Activo"} onInputChange={this.handleInputChange}
                    preload={this.state.product.status} />
                <SubmitRow text={this.props.action} onSubmitClick={this.handleSubmitClick} />
            </table>
        );
    }
}

export default ProductUpdateForm;