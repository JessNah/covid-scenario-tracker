import React, { Component } from "react";

class GeoLocation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: null,
			lng: null,
	  };
	}

	componentDidMount() {
		if (navigator.geolocation) {
		  navigator.geolocation.watchPosition((position) => {
			console.log("Latitude is :", position.coords.latitude);
			console.log("Longitude is :", position.coords.longitude);
			if( position.coords.latitude !== null){
				this.setState({lat: position.coords.latitude, lng: position.coords.longitude});
			}
		  });
		}
	  }
  
	render() {
		const children = React.Children.map(this.props.children, child => {
			return React.cloneElement(child, {
				...this.props,
				lat: this.state.lat,
				lng: this.state.lng
			});
		});
		return (
			<React.Fragment><div>{this.state.lat !== null && children}</div></React.Fragment>
		);
	}
}

export default GeoLocation;

