import React from 'react';
import ReactDOM from 'react-dom';
import widgets from './widgets/index.js'
 
const Widgets = props => {
    if (props.gotConfig) {
        const components = props.data.map((item) => widgets[props.index[item.id]]({ key: item.id, data: item.wdata }) )
        return <div>{components}</div>
    } else {
        return <div><em>Still fetching the config, please wait</em></div>
    }
}

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            event: new EventSource('/data/' + props.dashboardName),
            index: {},
            data: [],
            gotConfig: false
        };

        this.state.event.addEventListener('open', () => {
        }, false)

        this.state.event.addEventListener('message', e => {
            const data = JSON.parse(e.data)
            this.setState({ data: data });
        }, false)

        this.state.event.addEventListener('error', e => {
            console.log("There was an error with event listener: ", e)
        }, false)
    }

    componentWillReceiveProps(nextProps) {
        const index = {}
        nextProps.items.forEach(item => { index[item['id']] = item['widget'] })
        this.setState({ index: index, gotConfig: true })
    }

    render() { return <Widgets data={this.state.data} index={this.state.index} gotConfig={this.state.gotConfig} /> }
}
 
export default Dashboard;