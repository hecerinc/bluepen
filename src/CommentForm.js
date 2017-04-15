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
		// no blank note is open now (note is no longer blank)
		this.props.toggleIsBlank(false);

		this.newcomment.value = "";
		this.props.togglePermanence(false);
		this.props.updatePending(null);
	}
	handleFocus(e) {
		this.props.togglePermanence(true);
	}
	handleBlur(e) {
		if(e.target.value === "")
			this.props.togglePermanence(false);
	}
	handleType(e) {
		if(!this.props.isNew) // can only be blank or pending if you are also new
			return true;
		if(e.target.value === ""){
			this.props.toggleIsBlank(true);
			this.props.updatePending(null);
		}
		else{
			this.props.toggleIsBlank(false);
			this.props.updatePending(this.props.annotation);
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
