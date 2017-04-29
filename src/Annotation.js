import React from 'react';
import Thread from './Thread';
import CommentForm from './CommentForm';
import classNames from 'classnames';


class Annotation extends React.Component {
	constructor() {
		super();

		this.updateIsBlank = this.updateIsBlank.bind(this);
		this.updateFocus = this.updateFocus.bind(this);
		this.hoverIn = this.hoverIn.bind(this);
		this.hoverOut = this.hoverOut.bind(this);

		this.state = {
			isHoverPerm: false,
			isClickPerm: false,
			isBlank: true, // do I have something written?
			isFocused: false,
			// isNew: this is best calculated on render because we can't pass initial state to new annotation on constructor
			hovered: false,
		}
	}
	hoverIn(e) {
		this.setState({hovered: true}, () => {
			this.checkPerm();
		});
	}
	hoverOut(e) {
		this.setState({hovered: false}, () => {
			this.checkPerm();
		});
	}
	updateIsBlank(value) {
		this.setState({isBlank: value}, () => {
			const isNew = !this.props.annotations[this.props.index].hasOwnProperty('comments');
			if(isNew) {
				if(!this.state.isBlank) // let the Shot know that I'm pending
					this.props.updatePending(this.props.index);
				else
					this.props.updatePending(null);
			}
			this.checkPerm();
		});
	}
	updateFocus(value) {
		this.setState({isFocused: value}, () => {
			this.checkPerm();
		});
	}
	// componentDidUpdate() {
	// 	this.checkPerm();
	// } 
	checkPerm() {
		const isNew = !this.props.annotations[this.props.index].hasOwnProperty('comments');
		if(!this.state.isBlank || (!isNew && this.state.isFocused)){
			this.setState({isClickPerm: true, isHoverPerm: true});
		}
		else{
			let hover = false;
			if(isNew)
				hover = true;
			this.setState({isClickPerm: false, isHoverPerm: hover});
		}
	}
	render() {
		const details = this.props.annotations[this.props.index];
		const isNew = !details.hasOwnProperty('comments');
		let annotClass = classNames('annotation', 'comment-thread', 'pop', {
			'permanent': this.state.isClickPerm || this.state.isHoverPerm, 
			'open': this.state.hovered
		});
		return (
			<aside className={annotClass} 
				style={{position: 'absolute', top: details.y + 'px', left: details.x + 'px'}}
				onMouseEnter={e => this.hoverIn(e)}
				onMouseLeave={e => this.hoverOut(e)}
			>
				<i className="marker"></i>
				<div className="balloon">
					{(() => {
						if(!isNew)
							return <Thread comments={details.comments} />
					})()}
					<CommentForm 
						annotation={this.props.index} 
						singleid={this.props.singleid}
						isNew={isNew}
						updateFocus={this.updateFocus}
						updateIsBlank={this.updateIsBlank}
						updatePending={this.props.updatePending} 
						updateNewOpenState={this.props.updateNewOpenState}
						addCommentToThreadInSingle={this.props.addCommentToThreadInSingle} 
					/>
				</div>
			</aside>
		)
	}
}

export default Annotation;
