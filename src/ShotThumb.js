import React from 'react';

class ShotThumb extends React.Component {
	render() {
		let shot = this.props.shot;
		return (
			<article className="shot">
				<div className="container">
					<figure>
						<a href="#">
							<img src={shot.thumb} alt={shot.title} />
						</a>
						<figcaption>
							<a href="#"><span className="name">{shot.title}</span></a>
						</figcaption>
					</figure>
				</div>
			</article>
		)
	}
}

export default ShotThumb;
