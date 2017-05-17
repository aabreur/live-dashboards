import React from 'react';
import ReactDOM from 'react-dom';
 
class Example extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const alertClass = (this.props.data.value < 25) ? "alert-danger" : "alert-success"
        return <div className={"col-lg-6 alert " + alertClass}>{this.props.data.value}</div>
    }
}

const example = props => {
    return <Example {...props} />
}
 
export default example;