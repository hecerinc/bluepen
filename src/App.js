import React, { Component } from 'react';
import MainNav from './MainNav';
// import Projects from './Projects';
import Singles from './Singles';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
	constructor() {
		super();

		this.addSingle = this.addSingle.bind(this);

		this.state = {
			singles: {},
			projects: {}
		};
	}

	// State mutating methods
	addSingle(single) {
		const singles = {...this.state.singles};
		const timestamp = Date.now();
		singles['single-' +timestamp] = single;
		this.setState({singles});
	}
	render() {
		return (
			<div className="App">
				<MainNav />
				<Singles singles={this.state.singles} addSingle={this.addSingle} />
			</div>
		);
	}
}

export default App;
