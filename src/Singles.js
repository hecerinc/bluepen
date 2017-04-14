import React from 'react';
import ShotThumb from './ShotThumb';

class Singles extends React.Component {
	componentDidMount() {
		// Todo: abstract this into its own component
		let dropzone = document.getElementById('dropzone');
		dropzone.ondragover = dropzone.ondragenter = function(e) {
			e.stopPropagation();
			e.preventDefault();
		}
		dropzone.ondrop = (e) => {
			e.stopPropagation();
			e.preventDefault();
			// console.log("Start uploading now!");
			let files = e.dataTransfer.files;
			for (var i = 0; i < files.length; i++) {
				this.uploadFile(files[i]);
			}
		}
	}
	uploadFile(file) {
		console.log("Uploading file");
		var uri = "http://localhost/sandbox/redpen/src/server/uploader.php";
		var xhr = new XMLHttpRequest();
		var fd = new FormData();
		xhr.open("POST", uri, true);
		xhr.responseType = 'json';
		xhr.onreadystatechange = () => {
			// TODO: Add error handling here
			if (xhr.readyState === 4) {
				// && xhr.status == 200
				console.log("Response from server: ");
				console.log(xhr.response);
				if(xhr.status === 200) {
					// add to state
					this.createShot(xhr.response.shot);
				}
			}
		};
		fd.append('file_upload', file);
		xhr.send(fd);
	}
	createShot(response) {
		let now = Date.now();
		const single = {
			title: response.prettyname,
			description: '',
			image: response.img,
			thumb: response.thumb,
			created: now,
			modified: now,
			version: 1
		}
		this.props.addSingle(single);
	}
	render() {
		return (
			<section className="singles">
				<h2>Singles Component</h2>
				<ul className="filter-list inline">
					<li>
						<a href="#">All</a>
						<a href="#">Mine</a>
						<a href="#">Shared with me</a>
					</li>
				</ul>
				<a href="#" className="btn new-single u-fr">+ New single</a>
				<section className="single-list">
					{
						Object.keys(this.props.singles).map(key => <ShotThumb index={key} key={key} shot={this.props.singles[key]} />)
					}
				</section>
				<div id="dropzone" style={{width: '200px', height: '200px', border: '2px dashed #000'}}>
					<div className="centre-aligned">
						<span>Drop your image here</span>
					</div>
				</div>
				{/*}
				<input type="file" name="hello" id="myFile" />
				<button onClick={this.uploadFile}>Upload</button>
				{ /* new project prompt */}
			</section>
		)
	}
}

export default Singles;
