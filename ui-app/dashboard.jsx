import React from 'react';
import ReactDOM from 'react-dom';
import widgets from './widgets/index.js'
 
class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.buildWidgets = (items) => {
            return items.map(item => React.createElement(widgets[(item['widget'])], { data: "abc123", key: item['id'] }))
        }


        this.state = {
            event: new EventSource('/data/' + props.dashboardName),
            widgets: this.buildWidgets(props.items)
        };

        this.state.event.addEventListener('open', () => {
        }, false)

        this.state.event.addEventListener('message', e => {
            this.setState({ data: e.data });
        }, false)

        this.state.event.addEventListener('error', () => {
        }, false)

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ widgets: this.buildWidgets(nextProps.items) })
    }

    render() {
        return (
            <div>
                <h1>{this.props.dashboardName}</h1>
                <p className="lead">{this.state.data}</p>
                <h1>Items:</h1>
                <div>{this.state.widgets}</div>
            </div>
        )
    }
}
 
export default Dashboard;