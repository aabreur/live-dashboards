import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './dashboard.jsx';
 
class App extends React.Component {

    constructor(props) {
        super(props);

        const loadConfig = jsonConfig => {
            console.log("JSONCONFIG", jsonConfig)
            const config = jsonConfig.json().then( data => this.setState({ config: data }) )
        }

        const errorLoadingConfig = e => {
            console.log("There was an error reading this dashboard config", e)
        }

        const regex = /^\/dashboard\/(\w*)$/
        const path = window.location.pathname
        const dashboardName = regex.exec(path)[1]


        this.state = {
            dashboardName: dashboardName,
            config: []
        }

        const requestConfig = fetch("/config/" + dashboardName).then(loadConfig, errorLoadingConfig)
        
    } 
    render() {
        return (
            <div className="container">
                <div>
                    <h1>Teste SSE</h1>
                    <Dashboard dashboardName={this.state.dashboardName} items={this.state.config} />
                </div>
            </div>
        )
    }
}
 
ReactDOM.render(<App/>, document.getElementById('app'));