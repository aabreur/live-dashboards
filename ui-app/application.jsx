import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './dashboard.jsx';
 
class App extends React.Component {

    constructor(props) {
        super(props);
    } 
    render() {
        return (
            <div className="container">
                <div className="starter-template">
                    <h1>Teste SSE</h1>
                    <Dashboard dashboardName="teste" />
                </div>
            </div>
        )
    }
}
 
ReactDOM.render(<App/>, document.getElementById('app'));