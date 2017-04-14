import React from 'react';

class CommentForm extends React.Component {
	render() {
		return (
			<div className="comment-form-container">
				<form action="#">
					<div className="textarea-container">
						<textarea placeholder="Write your commment here..." className="comment-area"></textarea>
					</div>
					<button type="submit" className="submit-comment btn">Post comment</button>
				</form>
			</div>
		)
	}
}

export default CommentForm;
