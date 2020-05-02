import React, { Component } from 'react';
import { FileUploader } from 'carbon-components-react'
import './FileUploaderClass.scss';

class FileUploaderClass extends Component {
	constructor() {
		super();
		this.state = { inputFile: null, fileName: "", data: null }
	}


	updateFile = (evt) => {
		// console.log(evt);
		const files = evt.target.files;
		const length = evt.target.files.length;
		if (files && length > 0) {
			// console.log(files[0]);
			this.setState({ inputFile: files[0], fileName: files[0].name });

			let reader = new FileReader();
			reader.onload = r => {
			  this.processData(r.target.result);
			};
			reader.readAsText(files[0]);
		}
	}

	processData = (data) => {
		// console.log(data);
		let locationArray = [];
		let location = { lat: "", lng: "" }
		JSON.parse(data, function (key, value) {
			if (key === "latitudeE7" || key === "latE7") {
				const decimalVal = parseInt(value) * 0.0000001;
				location.lat = decimalVal + "";
			}
			if (key === "longitudeE7" || key === "lngE7") {
				const decimalVal = parseInt(value) * 0.0000001;
				location.lng = decimalVal + "";
				// console.log("lat: " + location.lat + ", lng: " +location.lng );
				locationArray.push({ lat: location.lat, lng: location.lng });
				location = { lat: "", lng: "" }
			}
		});
		this.props.updateUserLocationData(locationArray);
	}

	render() {
		return (
			<React.Fragment>
				<div className="wrapper">
					<FileUploader
					  accept={[
						'.json'
					  ]}
					  buttonKind="primary"
					  buttonLabel="Add files"
					  filenameStatus="edit"
					  iconDescription="Clear file"
					  labelDescription="only .json files at 500mb or less"
					  labelTitle="Upload"
					  multiple={false}
					  name=""
					  onChange={this.updateFile}
					  onClick={function noRefCheck(){}}
					  size="default"
					/>
				</div>
			</React.Fragment>
		);
	}
}

export default FileUploaderClass;
