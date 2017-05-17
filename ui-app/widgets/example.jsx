import React from 'react';
import ReactDOM from 'react-dom';
 
class Example extends React.Component {

    constructor(props) {
        super(props);
        console.log("creating an example with props", props)
    }

    render() {
        return <div>{this.props.data.value}</div>
    }
}

const example = props => {
    return <Example {...props} />
}
 
export default example;