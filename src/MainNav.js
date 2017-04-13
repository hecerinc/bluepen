import React from 'react'

class MainNav extends React.Component {
	render() {
		return (
			<div className="sidebar">
				<a href="#" className="logo">
					<h1>Blue Pen</h1>
				</a>
				<nav className="main-nav">
					<ul>
						<li><a href="#">Projects</a></li>
						<li><a href="#">Singles</a></li>
						<li className="logOut"><a href="#">Log out</a></li>
					</ul>
				</nav>
			</div>
		)
	}
}

export default MainNav;
