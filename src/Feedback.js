import React from 'react';
import Shot from './Shot';

class Feedback extends React.Component {
	// constructor() {
	// 	super();

	// 	this.toggleIsBlank = this.toggleIsBlank.bind(this);
	// }
	// toggleIsBlank(val) {
	// 	this.setState({isBlank: val});
	// }
	// shouldComponentUpdate(nextProps, nextState) {
	// 	if(nextState.hasOwnProperty('isBlank'))
	// 		return false;
	// 	return true;
	// }
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
				{/* get this value from url */}
				<Shot 
					key="single-1492204500794" 
					index="single-1492204500794" 
					// isBlank={this.state.isBlank} 
					// toggleIsBlank={this.toggleIsBlank} 
					deleteNote={this.props.deleteNote} 
					shot={this.props.singles["single-1492204500794"]} 
					moveAnnotationToPoint={this.props.moveAnnotationToPoint}
					addNewAnnotationAtPoint={this.props.addNewAnnotationAtPoint} 
					addCommentToThreadInSingle={this.props.addCommentToThreadInSingle} 
				/>
			</section>
		)
	}
}

export default Feedback;
