import React from 'react';

class Projects extends React.Component {
	render() {
		return (
			<section className="projects">
				<h2>Projects Component</h2>
				<ul className="filter-list inline">
					<li>
						<a href="#">All</a>
						<a href="#">Mine</a>
						<a href="#">Shared with me</a>
					</li>
				</ul>
				<a href="#" className="btn new-project u-fr">+ New project</a>
				<section className="project-list">
					{/* for each project print project */}
					<p>Project 1</p>
					<p>Project 2</p>
					<p>Project 3</p>
				</section>
				{ /* new project prompt */}
			</section>
		)
	}
}

export default Projects;
