import React from 'react';

class Comment extends React.Component {
	render() {
		return (
			<p>{this.props.comment.body}</p>
		)
	}
}

export default Comment;
