import React from 'react';
import './MapDashBoard.scss';
import HereMap from "../../Components/MapDashBoard/Map/HereMap";

const MapDashBoard = (props) => {
	console.log(props);
	return (
		<React.Fragment>
			<div className="mapDashboard">
				<HereMap/>
			</div>
		</React.Fragment>
	);
}

export default MapDashBoard;
