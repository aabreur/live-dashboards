import React from 'react';
import ReactDOM from 'react-dom';
 
class Example extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.data}
            </div>
        )
    }
}
 
export default Example;