import React from 'react';
import Thread from './Thread';
import CommentForm from './CommentForm';


class Annotation extends React.Component {
	render() {
		const details = this.props.details;
		return (
			<aside className="annotation comment-thread open pop" style={{position: 'absolute', top: details.y + 'px', left: details.x + 'px'}}>
				<i className="marker"> <i className="marker-inner"></i> </i>
				<div className="balloon">
					<Thread />
					<CommentForm />
				</div>
			</aside>
		)
	}
}

export default Annotation;
