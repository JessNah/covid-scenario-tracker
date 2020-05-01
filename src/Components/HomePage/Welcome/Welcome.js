import React, { Component } from 'react';
import './Welcome.scss';

class Welcome extends Component {
	state = {}

	render(){
		return (
			<React.Fragment>
				<div className={"HeaderGradient"}>
					<div className={"ApplicationName"}>
						Trace the Spread
					</div>
				</div>
				<div className={"Description"}>
					Placeholder text.
				</div>
			</React.Fragment>
		);
	}

}

export default Welcome;
