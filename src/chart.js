import * as d3 from 'd3';
import React, { Component } from 'react';

class Barchart extends Component{

	

		constructor(props) {
    		super(props);
    		this.myRef = React.createRef();
  			}
	

	componentDidMount(){
		this.draw();
	}

	draw(){

	}


	componentDidUpdate(){
		this.draw();
	}	


	
render(){
	return <div ref={this.myRef}/>;
}

}
export default Barchart;