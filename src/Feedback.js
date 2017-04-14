import React from 'react';
import Shot from './Shot';

class Feedback extends React.Component {
	render() {
		return (
			<section className="feedback">
				<h2>Feedback</h2>
				<div className="row">
					<ul className="design-nav inline u-fl" role="navigation">
						<li> <a className="previous" href="#">Previous</a> </li>
						<li> <a className="next" href="#">Next</a> </li>
					</ul>
					<a href="#" className="u-fr share btn">Share design!</a>
				</div>
				<hr/>
				<Shot addNewAnnotationAtPoint={this.props.addNewAnnotationAtPoint} key="single-1492204500794" index="single-1492204500794" shot={this.props.singles["single-1492204500794"]} />
			</section>
		)
	}
}

export default Feedback;
