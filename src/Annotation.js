import React from 'react';
import Thread from './Thread';
import CommentForm from './CommentForm';
import classNames from 'classnames';


class Annotation extends React.Component {
	constructor() {
		super();

		this.togglePermanence = this.togglePermanence.bind(this);

		this.state = {
			isPermanentlyOpen: false
		}
	}
	togglePermanence(val) {
		this.setState({isPermanentlyOpen: val});
	}

	render() {
		const details = this.props.annotations[this.props.index];
		const isNew = !details.hasOwnProperty('comments');
		let annotClass = classNames('annotation', 'comment-thread', 'closed', 'pop', {
			'permanent': this.state.isPermanentlyOpen || isNew
		});
		return (
			<aside className={annotClass} style={{position: 'absolute', top: details.y + 'px', left: details.x + 'px'}}>
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
						addCommentToThreadInSingle={this.props.addCommentToThreadInSingle} 
					/>
				</div>
			</aside>
		)
	}
}

export default Annotation;
