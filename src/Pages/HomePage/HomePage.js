import React from 'react';
import Welcome from "../../Components/HomePage/Welcome/Welcome";

const HomePage = (props) => {
	return (
		<React.Fragment>
			<Welcome {...props} />
		</React.Fragment>
	);
}

export default HomePage;
