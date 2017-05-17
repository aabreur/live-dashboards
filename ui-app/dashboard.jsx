import React from 'react';
import ReactDOM from 'react-dom';
import widgets from './widgets/index.js'
 
const Widgets = props => {
    console.log("props ------> ", props)
    if (props.gotConfig) {
        const components = props.data.map((item) => widgets[props.index[item.id]]({ key: item.id, data: item.wdata }) )
        return (
            <div>
                {components}
            </div>
        )
    } else {
        return <div><em>Still getting the config, please wait</em></div>
    }
}


class Dashboard extends React.Component {

    constructor(props) {
        super(props);


        // this.buildWidgets = (items) => {
        //     let index = {}
        //     items.forEach(item => {
        //         index[item['id']] = React.createElement(widgets[(item['widget'])], { key: item['id'], data: this.state.data })
        //     })
        //     return index
        // }

        // const index = this.buildWidgets(props.items)

        this.state = {
            event: new EventSource('/data/' + props.dashboardName),
            widgets: [],
            index: {},
            data: [],
            gotConfig: false
        };

        this.state.event.addEventListener('open', () => {
        }, false)

        this.state.event.addEventListener('message', e => {
            const data = JSON.parse(e.data)
            if (data) {
                this.setState({ data: data });
            }
        }, false)

        this.state.event.addEventListener('error', () => {
        }, false)


    }

    componentWillReceiveProps(nextProps) {
        // console.log("will call buildWidgets, this.state is:", this.state)
        // const index = this.buildWidgets(nextProps.items)
        // this.setState({ widgets: Object.values(index), index: index })
        const index = {}
        nextProps.items.forEach(item => { index[item['id']] = item['widget'] })
        this.setState({ index: index, gotConfig: true })
    }

    render() {
        return (
            <div>
                <h1>{this.props.dashboardName}</h1>
                <h1>Items:</h1>
                <Widgets data={this.state.data} index={this.state.index} gotConfig={this.state.gotConfig} />
            </div>
        )
    }
}
 
export default Dashboard;