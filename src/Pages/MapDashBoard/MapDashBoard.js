import React from 'react';
import './MapDashBoard.scss';
import HereMap from "../../Components/MapDashBoard/Map/HereMap";
import GeoLocation from "../../Components/MapDashBoard/GeoLocation/GeoLocation";

const MapDashBoard = (props) => {
	return (
		<React.Fragment>
			<div className="mapDashboard">
				<GeoLocation>
					<HereMap/>
				</GeoLocation>
			</div>
		</React.Fragment>
	);
}

export default MapDashBoard;
