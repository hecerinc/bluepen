import React, { Component } from 'react';
import MainNav from './MainNav';
// import Projects from './Projects';
// import Singles from './Singles';
import Feedback from './Feedback';
import sampledata from './sampledata';

class App extends Component {
	constructor() {
		super();

		this.addSingle = this.addSingle.bind(this);
		this.loadSampleData = this.loadSampleData.bind(this);
		this.addNewAnnotationAtPoint = this.addNewAnnotationAtPoint.bind(this);

		// this.state = {
		// 	singles: {},
		// 	projects: {}
		// };
		this.state = sampledata;
	}

	loadSampleData(event) {
		event.preventDefault();
		// load data here
		this.setState(sampledata);
	}
	// State mutating methods
	addNewAnnotationAtPoint(index, x, y) {
		const singles = {...this.state.singles};
		let single = singles[index];
		var annotations = {...single['annotations']};
		var timestamp = Date.now();
		annotations['annot-' + timestamp] = {x,y};
		single['annotations'] = annotations;
		this.setState({singles});
	}
	addSingle(single) {
		const singles = {...this.state.singles};
		const timestamp = Date.now();
		singles['single-' + timestamp] = single;
		this.setState({singles});
	}
	render() {
		return (
			<div className="App">
				<MainNav loadSampleData={this.loadSampleData} />
				<Feedback addNewAnnotationAtPoint={this.addNewAnnotationAtPoint} singles={this.state.singles} />
				{/*<Singles singles={this.state.singles} addSingle={this.addSingle} />*/}
			</div>
		);
	}
}

export default App;
