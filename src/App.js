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
		this.deleteNote = this.deleteNote.bind(this);
		this.growFromRight = this.growFromRight.bind(this);
		this.loadSampleData = this.loadSampleData.bind(this);
		this.moveAnnotationToPoint = this.moveAnnotationToPoint.bind(this);
		this.addNewAnnotationAtPoint = this.addNewAnnotationAtPoint.bind(this);
		this.addCommentToThreadInSingle = this.addCommentToThreadInSingle.bind(this);

		// this.state = {
		// 	singles: {},
		// 	projects: {}
		// };
		// TODO: Change this back to default initial (blank) state
		this.state = sampledata;
	}

	loadSampleData(event) {
		event.preventDefault();
		// load data here
		this.setState(sampledata);
	}
	// State mutating methods
	addNewAnnotationAtPoint(index, x, y, growsFromRight) {
		const singles = {...this.state.singles};
		let single = singles[index];
		var annotations = {...single['annotations']};
		var timestamp = Date.now();
		annotations['annot-' + timestamp] = {x,y, growsFromRight};
		single['annotations'] = annotations;
		this.setState({singles});

		// return the newly added key so that the Shot component 
		// is aware which one is the last annotation crated 
		// (we need this for deleting blank notes)
		
		return 'annot-'+timestamp; 
	}
	growFromRight(singleid, annot, value) {
		const singles = {...this.state.singles};
		let single = singles[singleid];
		var annotations = single['annotations'];
		annotations[annot].growsFromRight = value;
		this.setState({singles});
	}
	moveAnnotationToPoint(singleid, annot, x, y) {
		const singles = {...this.state.singles};
		let single = singles[singleid];
		var annotations = single['annotations'];
		annotations[annot].x = x;
		annotations[annot].y = y;
		this.setState({singles});
	}
	deleteNote(index, annotid) {
		const singles = {...this.state.singles};
		let single = singles[index];
		var annotations = single['annotations'];
		delete annotations[annotid];
		// single['annotations'] = annotations;
		this.setState({singles});
	}
	addCommentToThreadInSingle(singleid, annot, newcomment) {
		const singles = {...this.state.singles};
		let single = singles[singleid];
		var annotations = single['annotations'];
		var annotation = annotations[annot];
		if(annotation.hasOwnProperty('comments'))
			annotation.comments.push(newcomment);
		else
			annotation['comments'] = [newcomment];
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
				<Feedback 
					singles={this.state.singles} 
					deleteNote={this.deleteNote} 
					growFromRight={this.growFromRight} 
					moveAnnotationToPoint={this.moveAnnotationToPoint}
					addNewAnnotationAtPoint={this.addNewAnnotationAtPoint} 
					addCommentToThreadInSingle={this.addCommentToThreadInSingle} 
				/>
				{/*<Singles singles={this.state.singles} addSingle={this.addSingle} />*/}
			</div>
		);
	}
}

export default App;
