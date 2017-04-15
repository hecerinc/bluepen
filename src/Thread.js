import React from 'react';
import Comment from './Comment';


class Thread extends React.Component {
	render() {
		const comments = this.props.comments;
		return (
			<div className="thread-container">
				{
					comments.map((comment) => {
						return <Comment key={comment.id} index={comment.id} comment={comment} />
					})
				}
			</div>
		)
	}
}

export default Thread;
