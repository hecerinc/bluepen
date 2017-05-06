import React from 'react';

class CommentForm extends React.Component {
	handleSubmit(e) {
		e.preventDefault();
		// add it to this comment's state
		const timestamp = Date.now();
		const comment = {
			"id": "comment-"+timestamp,
			"author": "Hector Rincon",
			"body": this.newcomment.value,
			"created": timestamp,
			"modified": timestamp
		}
		this.props.addCommentToThreadInSingle(this.props.singleid, this.props.annotation, comment);
		this.props.updateIsBlank(true); // This annotation is now blank (nothing is written)
		// No blank note is open, let Shot know
		this.props.updateNewOpenState(false);
		this.props.updatePending(null);

		this.newcomment.value = ""; // reset textarea
	}
	handleFocus(e) {
		this.props.updateFocus(true);
	}
	handleBlur(e) {
		this.props.updateFocus(false);
	}
	handleType(e) {
		if(e.target.value === ""){
			this.props.updateIsBlank(true);
		}
		else{
			this.props.updateIsBlank(false);
		}
	}
	render() {
		return (
			<div className="comment-form-container">
				<form action="#" onSubmit={e => this.handleSubmit(e)}>
					<div className="textarea-container">
						<textarea 
							className="comment-area"
							onBlur={e => this.handleBlur(e)}
							onFocus={e => this.handleFocus(e)}
							onChange={e => this.handleType(e)}
							ref={input => this.newcomment = input} 
							placeholder="Write your commment here..." 
						>
						</textarea>
					</div>
					<button type="submit" className="submit-comment btn">Post comment</button>
				</form>
			</div>
		)
	}
}

export default CommentForm;
