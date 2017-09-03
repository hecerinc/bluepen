import React from 'react';
import {Link} from 'react-router-dom'

class ShotThumb extends React.Component {
	render() {
		let shot = this.props.shot;
		return (
			<article className="shot">
				<div className="container">
					<figure>
						<Link to={this.props.match.url+'/'+this.props.index}>
							<img src={shot.thumb} alt={shot.title} />
						</Link>
						<figcaption>
							<a href="#"><span className="name">{shot.title}</span></a>
						</figcaption>
						<a href="#" className="rename-btn">Rename</a>
						<a href="#" className="delete-btn">Delete shot</a>
					</figure>
				</div>
			</article>
		)
	}
}

export default ShotThumb;
