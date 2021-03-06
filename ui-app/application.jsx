import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './dashboard.jsx';
 
class App extends React.Component {

    constructor(props) {
        super(props);

        const loadConfig = jsonConfig => {
            jsonConfig.json().then( data => this.setState({ config: data }) )
        }

        const errorLoadingConfig = e => {
            console.log("There was an error reading this dashboard config", e)
        }

        const dashboardName = window.livedash.dashboardName

        this.state = {
            dashboardName: dashboardName,
            config: []
        }
        const requestConfig = fetch("/config/" + dashboardName).then(loadConfig, errorLoadingConfig)
        
    } 
    render() {
        return (
            <div className="row">
                <Dashboard dashboardName={this.state.dashboardName} items={this.state.config} />
            </div>
        )
    }
}
 
ReactDOM.render(<App/>, document.getElementById('app'));