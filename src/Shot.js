import React from 'react';
import Annotation from './Annotation';

class Shot extends React.Component {
	constructor() {
		super();

		this.handleTouch = this.handleTouch.bind(this);
		this.updatePending = this.updatePending.bind(this);
		this.updateOpenState = this.updateOpenState.bind(this);
		this.updateNewOpenState = this.updateNewOpenState.bind(this);

		this.state = {
			//isSomethingOpen: false, // permanently so
			isNewOpen: false, // is a new (blank) note open?
			lastCreated: null,
			isPending: null // a "pending" note is a new note that has text written to its textarea
		}
	}
	handleTouch(event) {
		const canvas = document.getElementById('shot-img');
		const rect = canvas.getBoundingClientRect();
		const x = Math.round(event.clientX - rect.left);
		const y = Math.round(event.clientY - rect.top);

		// Add annotation to state
		if(!this.state.isNewOpen && this.state.isPending == null) { // if there are no blank annotations open, create a new one
			const lastId = this.props.addNewAnnotationAtPoint(this.props.index, x, y);
			this.updateNewOpenState(true); // tell the feedback container there's a new blank annotation open
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
			this.updateNewOpenState(false);
		}
	}
	updateOpenState (value, isNew = false) {
		if(!isNew)
			this.setState({isSomethingOpen: value});
		else
			this.setState({isSomethingOpen: value, isNewOpen: true}); //TODO: maybe change this, it's not very straightforward
	}
	updateNewOpenState(value) {
		this.setState({isNewOpen: value});
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
										updateNewOpenState={this.updateNewOpenState} 
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
