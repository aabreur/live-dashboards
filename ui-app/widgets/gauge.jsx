import React from 'react';
import ReactDOM from 'react-dom';
import nothing2 from 'raphael';
const Raphael = window.Raphael;
import nothing from 'justgage';
const JustGage = window.JustGage;
 
class Gauge extends React.Component {

    constructor(props) {
        super(props);
        const timenow = (new Date).getTime();
        const defaults = {
        	id: `gauge-${timenow}`,
        	value: 0,
        	min: 0,
        	max: 100,
        	decimals: 2,
        	gaugeWidthScale: 0.6,
      		customSectors: [{
        		color : "#00ff00",
        		lo : 0,
        		hi : 50
      		},{
        		color : "#ff0000",
        		lo : 50,
        		hi : 100
      		}],
      		counter: true	
        }
        this.state = { 
        	gauge: null,
        	gaugeAttrs: { ...defaults, ...props }
        }
    }


    componentWillReceiveProps(nextProps) {
    	if (nextProps.data.value) {
        	this.state.gauge.refresh(nextProps.data.value)
    	}
    }

    componentDidMount(){
    	this.setState({ gauge: new JustGage(this.state.gaugeAttrs) })
    }

    render() {
        return <div id={this.state.gaugeAttrs.id} className="gauge"></div>
    }
}

const gauge = props => {
    return <Gauge {...props} />
}
 
export default gauge;