import React, {Component} from "react";
import HomePage from "./Pages/HomePage/HomePage";
import MapDashBoard from "./Pages/MapDashBoard/MapDashBoard";
import UserInput from "./Pages/UserInput/UserInput";
import HeaderBar from "./Components/Navigation/HeaderBar/HeaderBar";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

class ProjectRoot extends Component {
	constructor() {
		super();
		//store data needed cross app here
		this.state = { 
			loggedIn: false,
			usrLocationData: []
		 }
	}

	updateUserLocationData = (dataArray) => {
		this.setState({ usrLocationData: dataArray })
	}

	render() {
		return (
			<React.Fragment>
				<header>
					<HeaderBar/>
				</header>
				<Switch>
					<Route exact path={"/"} component={HomePage} />
					<Route path={"/map/"} render={()=> React.cloneElement(<MapDashBoard/>, {usrLocationData: this.state.usrLocationData})} />
					<Route path={"/log_entry/"} render={()=> React.cloneElement(<UserInput/>, {updateUserLocationData: this.updateUserLocationData})} />
					<Redirect from='*' to='/' />
				</Switch>
			</React.Fragment>
		);
	}
}
export default withRouter(ProjectRoot);