import React, { Component } from 'react';
import FileUploaderClass from "../../Components/UserInput/FileUploaderClass/FileUploaderClass";
import './UserInput.scss';

class UserInput extends Component {
	constructor() {
		super();
		this.state = { }
	}

	render() {
		return (
			<React.Fragment>
				<div className={"bx--row columns"}>
					<div className={"bx--col verticallyCenter leftCol"}>
						<div>
							<div className="wrapper">
								<div className={"fileUpload_head"}>
									Tested Positive?
								</div>
								<div className={"fileUpload_sub"}>
									By choosing to upload your personal location history for the past 14 days, you will be helping everyone to stay safe.
								</div>
								<div className={"fileUpload_sub"}>
									Apart from location history, we don't ask for any personal details and we never save precise locations, so there's nothing to fear! We'll keep you safe, so that you keep everyone else safe.
								</div>
							</div>
						</div>
					</div>
					<div className={"bx--col verticallyCenter"}>
						<FileUploaderClass {...this.props}/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default UserInput;
