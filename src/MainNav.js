import React from 'react'
import {Link} from 'react-router-dom'

class MainNav extends React.Component {
	render() {
		return (
			<div className="sidebar">
				<a href="#" className="logo">
					<h1>Blue Pen</h1>
				</a>
				<nav className="main-nav">
					<ul>
						<li><Link to="/projects">Projects</Link></li>
						<li><Link to="/shots">Shots</Link></li>
						<li className="logOut"><a href="#">Log out</a></li>
					</ul>
				</nav>
			</div>
		)
	}
}

export default MainNav;
