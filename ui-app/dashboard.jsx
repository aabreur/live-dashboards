import React from 'react';
import ReactDOM from 'react-dom';
 
class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            event: new EventSource('/data/' + props.dashboardName)
        };

        this.state.event.addEventListener('open', () => {
            console.log("open eventSource");
        }, false);

        this.state.event.addEventListener('message', e => {
            console.log(e);
            this.setState({ data: e.data });
        }, false);

        this.state.addEventListener('error', () => {
            console.log("erro EventSource");
        }, false);

    }

    render() {
        return <p className="lead">{this.state.data}</p>
    }
}
 
export default Dashboard;