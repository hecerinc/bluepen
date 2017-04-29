import React from 'react';
import Annotation from './Annotation';
import { isRightMarginEnough } from './utils';

class Shot extends React.Component {
	constructor() {
		super();

		this.handleTouch = this.handleTouch.bind(this);
		this.updatePending = this.updatePending.bind(this);

		this.state = {
			lastCreated: null,
			isPending: null // a "pending" note is a new note that has text written to its textarea
		}
	}
	handleTouch(event) {
		const canvas = document.getElementById('shot-img');
		const rect = canvas.getBoundingClientRect();
		let x = Math.round(event.clientX - rect.left);
		const y = Math.round(event.clientY - rect.top);
		let isRight = false;
		if(!isRightMarginEnough(event)){
		// 	// draw to the right
		// 	// x -= 190; // TODO: change this back to 250 when CSS implemented
			isRight = true;
		}

		// Add annotation to state
		if(!this.props.isBlank && this.state.isPending == null) { // if there are no blank annotations open, create a new one
			this.props.toggleIsBlank(true); // tell the feedback container there's a blank annotation open
			const lastId = this.props.addNewAnnotationAtPoint(this.props.index, x, y, isRight);
			this.setState({lastCreated: lastId});
		}
		else if(this.state.isPending != null) { // if there is, check it's not pending
			// just move it to new location
			this.props.moveAnnotationToPoint(this.props.index, this.state.isPending, x, y);
		}
		else { // if there is,
			// just close it (effectively, delete the new one):
			// get last annotation created
			// delete it from state
			this.props.deleteNote(this.props.index, this.state.lastCreated);
			this.props.toggleIsBlank(false);
		}
	}
	updatePending(pendingId) {
		this.setState({isPending: pendingId});
	}
	render() {
		const shot = this.props.shot;
		const annotations = shot['annotations'];
		return (
			<article className="shot">
				<div className="container">
					<h3>{shot.title}</h3>
					<h5>{shot.description}</h5>
					<div className="img-container" style={{position: 'relative'}}>
						<img id="shot-img" onClick={(e) => this.handleTouch(e)} src={shot.image} alt={shot.title} />
						<div className="annotations">
							{
								Object.keys(annotations).map((key) => 
									<Annotation 
										key={key} 
										index={key} 
										annotations={annotations} 
										singleid={this.props.index} 
										toggleIsBlank={this.props.toggleIsBlank} 
										growFromRight={this.props.growFromRight} 
										updatePending={this.updatePending}
										addCommentToThreadInSingle={this.props.addCommentToThreadInSingle} 
									/>
								)
							}
						</div>
					</div>
				</div>
			</article>
		)
	}
}

export default Shot;
