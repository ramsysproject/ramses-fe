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
                <td><input type='text' onChange={this.handleTextChange}/></td>
            </tr>
        );
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

export {
    TextInputRow,
    SubmitRow
}