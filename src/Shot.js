import React from 'react';
import Annotation from './Annotation';

class Shot extends React.Component {
	handleTouch(event) {
		const canvas = document.getElementById('shot-img');
	    const rect = canvas.getBoundingClientRect();
	    const x = Math.round(event.clientX - rect.left);
	    const y = Math.round(event.clientY - rect.top);
	    // console.log("x: " + x + " y: " + y);
	    // Add annotation to state
	    this.props.addNewAnnotationAtPoint(this.props.index, x, y);
	}
	render() {
		const shot = this.props.shot;
		const annotations = shot['annotations'];
		return (
			<article className="shot">
				<div className="container">
					<h3>{shot.title}</h3>
					<h5>{shot.description}</h5>
					<div className="img-container" style={{position: 'relative'}}>
						<img id="shot-img" onClick={(e) => this.handleTouch(e)} src={shot.image} alt={shot.title} />
						<div className="annotations">
							{
								Object.keys(annotations).map((key) => <Annotation key={key} details={annotations[key]} />)
							}
						</div>
					</div>
				</div>
			</article>
		)
	}
}

export default Shot;
