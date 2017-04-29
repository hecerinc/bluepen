import React from 'react';
import Thread from './Thread';
import CommentForm from './CommentForm';
import classNames from 'classnames';
import { isRightMarginEnough, annotationWidth } from './utils';


class Annotation extends React.Component {
	// 240px wide : max-width
	// outercontainer: 10 on each side 260px
	constructor() {
		super();

		this.togglePermanence = this.togglePermanence.bind(this);
		this.hoverIn = this.hoverIn.bind(this);
		this.hoverOut = this.hoverOut.bind(this);

		this.state = {
			isPermanentlyOpen: false,
			hovered: false
		}
	}
	togglePermanence(val) {
		this.setState({isPermanentlyOpen: val});
	}

	hoverIn(e) {
		// check here if we should grow this one from right
		// should we?
		const isNew = !this.props.annotations[this.props.index].hasOwnProperty('comments');
		if(!(this.state.isPermanentlyOpen || isNew)){
			if(!isRightMarginEnough(e)){
				// draw this to the left
				this.props.growFromRight(this.props.singleid, this.props.index, true);
			}
			else {
				this.props.growFromRight(this.props.singleid, this.props.index, false);
			}
		}
		this.setState({hovered: true});
	}
	hoverOut(e) {
		const isNew = !this.props.annotations[this.props.index].hasOwnProperty('comments');
		if(!(this.state.isPermanentlyOpen || isNew))
			this.props.growFromRight(this.props.singleid, this.props.index, false);
		this.setState({hovered: false});
	}
	render() {
		const details = this.props.annotations[this.props.index];
		const isNew = !details.hasOwnProperty('comments');
		const x = details.growsFromRight ? (details.x - annotationWidth) : details.x; 
		let annotClass = classNames('annotation', 'comment-thread', 'pop', {
			'permanent': this.state.isPermanentlyOpen || isNew,
			'fromRight': details.growsFromRight,
			'open': this.state.hovered
		});
		return (
			<aside className={annotClass} style={{position: 'absolute', top: details.y + 'px', left: x + 'px'}} onMouseEnter={e => this.hoverIn(e)} onMouseLeave={e => this.hoverOut(e)}>
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
						togglePermanence={this.togglePermanence} 
						toggleIsBlank={this.props.toggleIsBlank}
						updatePending={this.props.updatePending} 
						growFromRight={this.props.growFromRight}
						addCommentToThreadInSingle={this.props.addCommentToThreadInSingle} 
					/>
				</div>
			</aside>
		)
	}
}

export default Annotation;
