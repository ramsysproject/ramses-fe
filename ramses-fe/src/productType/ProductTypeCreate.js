import React from 'react';
import { TextInputRow, SubmitRow } from '../RamsesComponents.js';

class ProductTypeCreateView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productType: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleInputChange(key, value) {
        this.setState({
            productType: {
                  ...this.state.productType,
                  [key]: value
            }
        }, console.log(this.state))
    }

    handleSubmitClick() {
        console.log("Porudc name: " + this.state.productType.name);
        fetch('http://localhost:8090/product-types', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.productType.name
          })
        })
    }

    render() {
        return (
            <div>
                <TextInputRow field={"name"} text="Nombre" onInputChange={this.handleInputChange} />
                <SubmitRow text="Registrar" onSubmitClick={this.handleSubmitClick} />
            </div>
        );
    }
}

export default ProductTypeCreateView