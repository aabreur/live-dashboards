import React from 'react';
import ReactDOM from 'react-dom';
import widgets from './widgets/index.js'
 
class Dashboard extends React.Component {

    constructor(props) {
        super(props);


        this.buildWidgets = (items) => {
            let index = {}
            items.forEach(item => {
                index[item['id']] = React.createElement(widgets[(item['widget'])], { key: item['id'], id: item['id'], data: {} })
            })
            return index
        }

        const index = this.buildWidgets(props.items)


        this.state = {
            event: new EventSource('/data/' + props.dashboardName),
            widgets: Object.values(index),
            index: index
        };

        this.state.event.addEventListener('open', () => {
        }, false)

        this.state.event.addEventListener('message', e => {
            const data = JSON.parse(e.data)
            for (var item of data) {
                console.log("item", item)
                const el = document.getElementById(item['id'])
                console.log("el", el)
                el.setProps({ data: item['wdata']})
            }
            this.setState({ data: data });
        }, false)

        this.state.event.addEventListener('error', () => {
        }, false)

    }

    componentWillReceiveProps(nextProps) {
        const index = this.buildWidgets(nextProps.items)
        this.setState({ widgets: Object.values(index), index: index })
    }

    render() {
        return (
            <div>
                <h1>{this.props.dashboardName}</h1>
                <h1>Items:</h1>
                <div>{this.state.widgets}</div>
            </div>
        )
    }
}
 
export default Dashboard;