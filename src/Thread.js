import React from 'react';
import Comment from './Comment';


class Thread extends React.Component {
	render() {
		return (
			<div className="thread-container">
				<Comment />
			</div>
		)
	}
}

export default Thread;
